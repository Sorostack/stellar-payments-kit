#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol};

const SWAP: Symbol = symbol_short!("swap");

#[contracttype]
#[derive(Clone)]
pub struct SwapOrder {
    pub initiator: Address,
    pub token_a: Address,
    pub token_b: Address,
    pub amount_a: i128,
    pub amount_b: i128,
    pub counter_party: Address,
    pub fulfilled: bool,
}

#[contract]
pub struct TokenSwapContract;

#[contractimpl]
impl TokenSwapContract {
    pub fn create_swap(
        env: Env,
        initiator: Address,
        token_a: Address,
        token_b: Address,
        amount_a: i128,
        amount_b: i128,
        counter_party: Address,
    ) {
        initiator.require_auth();

        let order = SwapOrder {
            initiator,
            token_a,
            token_b,
            amount_a,
            amount_b,
            counter_party,
            fulfilled: false,
        };

        env.storage().instance().set(&SWAP, &order);
    }

    pub fn fulfill_swap(env: Env, caller: Address) {
        caller.require_auth();

        let mut order: SwapOrder = env.storage().instance().get(&SWAP).unwrap();
        assert_eq!(caller, order.counter_party, "only counter_party can fulfill");
        assert!(!order.fulfilled, "already fulfilled");

        order.fulfilled = true;
        env.storage().instance().set(&SWAP, &order);
    }

    pub fn cancel_swap(env: Env, caller: Address) {
        caller.require_auth();

        let order: SwapOrder = env.storage().instance().get(&SWAP).unwrap();
        assert_eq!(caller, order.initiator, "only initiator can cancel");
        assert!(!order.fulfilled, "already fulfilled");

        env.storage().instance().remove(&SWAP);
    }

    pub fn get_swap(env: Env) -> Option<SwapOrder> {
        env.storage().instance().get(&SWAP)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::testutils::Address as _;

    #[test]
    fn test_create_and_get_swap() {
        let env = Env::default();
        env.mock_all_auths();
        let initiator = Address::generate(&env);
        let token_a = Address::generate(&env);
        let token_b = Address::generate(&env);
        let counter_party = Address::generate(&env);

        let contract_id = env.register(TokenSwapContract, ());
        let client = TokenSwapContractClient::new(&env, &contract_id);

        client.create_swap(&initiator, &token_a, &token_b, &100, &200, &counter_party);

        let order = client.get_swap().unwrap();
        assert_eq!(order.initiator, initiator);
        assert!(!order.fulfilled);
    }

    #[test]
    fn test_fulfill_swap() {
        let env = Env::default();
        env.mock_all_auths();
        let initiator = Address::generate(&env);
        let token_a = Address::generate(&env);
        let token_b = Address::generate(&env);
        let counter_party = Address::generate(&env);

        let contract_id = env.register(TokenSwapContract, ());
        let client = TokenSwapContractClient::new(&env, &contract_id);

        client.create_swap(&initiator, &token_a, &token_b, &100, &200, &counter_party);
        client.fulfill_swap(&counter_party);

        let order = client.get_swap().unwrap();
        assert!(order.fulfilled);
    }

    #[test]
    fn test_cancel_swap() {
        let env = Env::default();
        env.mock_all_auths();
        let initiator = Address::generate(&env);
        let token_a = Address::generate(&env);
        let token_b = Address::generate(&env);
        let counter_party = Address::generate(&env);

        let contract_id = env.register(TokenSwapContract, ());
        let client = TokenSwapContractClient::new(&env, &contract_id);

        client.create_swap(&initiator, &token_a, &token_b, &100, &200, &counter_party);
        client.cancel_swap(&initiator);

        assert!(client.get_swap().is_none());
    }
}
