#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol};

const LOCK: Symbol = symbol_short!("lock");

#[contracttype]
#[derive(Clone)]
pub struct TimeLock {
    pub user: Address,
    pub unlock_time: u64,
}

#[contract]
pub struct TimeLockedAuthContract;

#[contractimpl]
impl TimeLockedAuthContract {
    pub fn set_lock(env: Env, user: Address, unlock_time: u64) {
        user.require_auth();
        let lock = TimeLock { user, unlock_time };
        env.storage().instance().set(&LOCK, &lock);
    }

    pub fn can_execute(env: Env, user: Address) -> bool {
        let lock: TimeLock = env.storage().instance().get(&LOCK).unwrap();
        let current_time = env.ledger().timestamp();
        current_time >= lock.unlock_time
    }

    pub fn get_lock(env: Env) -> Option<TimeLock> {
        env.storage().instance().get(&LOCK)
    }
}
