#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, vec, Address, Env, Vec};

#[contracttype]
#[derive(Clone)]
pub struct Proposal {
    pub id: u64,
    pub target: Address,
    pub value: i128,
    pub executed: bool,
    pub approvals: Vec<Address>,
}

#[contract]
pub struct MultiSigContract;

#[contractimpl]
impl MultiSigContract {
    pub fn create_proposal(env: Env, id: u64, target: Address, value: i128) {
        let proposal = Proposal {
            id,
            target,
            value,
            executed: false,
            approvals: vec![&env],
        };
        env.storage().instance().set(&id, &proposal);
    }

    pub fn approve(env: Env, id: u64, signer: Address) {
        signer.require_auth();
        let mut proposal: Proposal = env.storage().instance().get(&id).unwrap();
        proposal.approvals.push_back(signer);
        env.storage().instance().set(&id, &proposal);
    }

    pub fn get_proposal(env: Env, id: u64) -> Option<Proposal> {
        env.storage().instance().get(&id)
    }
}
