#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol};

const DEPOSITED: Symbol = symbol_short!("deposited");
const RELEASED: Symbol = symbol_short!("released");
const REFUNDED: Symbol = symbol_short!("refunded");

#[contracttype]
#[derive(Clone)]
pub enum EscrowState {
    Pending,
    Released,
    Refunded,
}

#[contracttype]
#[derive(Clone)]
pub struct Escrow {
    pub depositor: Address,
    pub beneficiary: Address,
    pub arbiter: Address,
    pub amount: i128,
    pub state: EscrowState,
}

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    pub fn deposit(env: Env, depositor: Address, beneficiary: Address, arbiter: Address, amount: i128) {
        depositor.require_auth();

        let escrow = Escrow {
            depositor,
            beneficiary,
            arbiter,
            amount,
            state: EscrowState::Pending,
        };

        env.storage().instance().set(&DEPOSITED, &escrow);
    }

    pub fn release(env: Env, caller: Address) {
        caller.require_auth();

        let mut escrow: Escrow = env.storage().instance().get(&DEPOSITED).unwrap();
        assert_eq!(caller, escrow.arbiter, "only arbiter can release");
        assert!(matches!(escrow.state, EscrowState::Pending), "already resolved");

        escrow.state = EscrowState::Released;
        env.storage().instance().set(&DEPOSITED, &escrow);
        env.storage().instance().set(&RELEASED, &true);
    }

    pub fn refund(env: Env, caller: Address) {
        caller.require_auth();

        let mut escrow: Escrow = env.storage().instance().get(&DEPOSITED).unwrap();
        assert_eq!(caller, escrow.arbiter, "only arbiter can refund");
        assert!(matches!(escrow.state, EscrowState::Pending), "already resolved");

        escrow.state = EscrowState::Refunded;
        env.storage().instance().set(&DEPOSITED, &escrow);
        env.storage().instance().set(&REFUNDED, &true);
    }

    pub fn state(env: Env) -> Option<EscrowState> {
        let escrow: Escrow = env.storage().instance().get(&DEPOSITED)?;
        Some(escrow.state)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::testutils::Address as _;

    #[test]
    fn test_deposit() {
        let env = Env::default();
        env.mock_all_auths();
        let depositor = Address::generate(&env);
        let beneficiary = Address::generate(&env);
        let arbiter = Address::generate(&env);

        let contract_id = env.register(EscrowContract, ());
        let client = EscrowContractClient::new(&env, &contract_id);

        client.deposit(&depositor, &beneficiary, &arbiter, &1000);

        let state = client.state();
        assert!(matches!(state, Some(EscrowState::Pending)));
    }
}
