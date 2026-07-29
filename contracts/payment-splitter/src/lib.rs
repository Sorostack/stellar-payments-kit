#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, vec, Address, Env, Vec};

#[contracttype]
#[derive(Clone)]
pub struct SplitConfig {
    pub payees: Vec<Address>,
    pub shares: Vec<u32>,
    pub total_shares: u32,
}

#[contracttype]
pub struct Payment {
    pub total_amount: i128,
    pub distributed: bool,
}

#[contract]
pub struct PaymentSplitterContract;

#[contractimpl]
impl PaymentSplitterContract {
    pub fn initialize(env: Env, payees: Vec<Address>, shares: Vec<u32>) {
        let total: u32 = shares.iter().sum();
        let config = SplitConfig {
            payees,
            shares,
            total_shares: total,
        };
        env.storage().instance().set(&symbol_let!("config"), &config);
    }

    pub fn receive_payment(env: Env, amount: i128) {
        let payment = Payment {
            total_amount: amount,
            distributed: false,
        };
        env.storage().instance().set(&symbol_let!("payment"), &payment);
    }

    pub fn distribute(env: Env, caller: Address) -> Vec<i128> {
        caller.require_auth();

        let config: SplitConfig = env.storage().instance().get(&symbol_let!("config")).unwrap();
        let payment: Payment = env.storage().instance().get(&symbol_let!("payment")).unwrap();
        assert!(!payment.distributed, "already distributed");

        let mut amounts: Vec<i128> = vec![&env];

        for i in 0..config.payees.len() {
            let share = config.shares.get(i).unwrap();
            let amount = (payment.total_amount * share as i128) / config.total_shares as i128;
            amounts.push_back(amount);
        }

        let updated = Payment {
            total_amount: payment.total_amount,
            distributed: true,
        };
        env.storage().instance().set(&symbol_let!("payment"), &updated);

        amounts
    }

    pub fn get_config(env: Env) -> Option<SplitConfig> {
        env.storage().instance().get(&symbol_let!("config"))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::Env;

    #[test]
    fn test_initialize_and_distribute() {
        let env = Env::default();
        let payee1 = Address::generate(&env);
        let payee2 = Address::generate(&env);

        let payees = vec![&env, payee1.clone(), payee2.clone()];
        let shares = vec![&env, 60u32, 40u32];

        let contract_id = env.register_contract(None, PaymentSplitterContract);
        let client = PaymentSplitterContractClient::new(&env, &contract_id);

        client.initialize(&payees, &shares);
        client.receive_payment(&1000);

        let result = client.distribute(&payee1);
        assert_eq!(result.len(), 2);
        assert_eq!(result.get(0).unwrap(), 600);
        assert_eq!(result.get(1).unwrap(), 400);
    }
}
