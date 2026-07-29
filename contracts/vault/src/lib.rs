#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol};

const VAULT: Symbol = symbol_short!("vault");

#[contracttype]
#[derive(Clone)]
pub struct Vault {
    pub owner: Address,
    pub locked_until: u64,
    pub min_withdraw: i128,
}

#[contract]
pub struct VaultContract;

#[contractimpl]
impl VaultContract {
    pub fn initialize(env: Env, owner: Address, locked_until: u64, min_withdraw: i128) {
        owner.require_auth();
        let vault = Vault { owner, locked_until, min_withdraw };
        env.storage().instance().set(&VAULT, &vault);
    }

    pub fn get_vault(env: Env) -> Option<Vault> {
        env.storage().instance().get(&VAULT)
    }
}
