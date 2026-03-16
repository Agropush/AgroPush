#![no_std]

use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, Symbol};

const SELLER: Symbol = symbol_short!("SELLER");
const BUYER: Symbol = symbol_short!("BUYER");
const AMOUNT: Symbol = symbol_short!("AMOUNT");
const LOCKED: Symbol = symbol_short!("LOCKED");

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    pub fn deposit(env: Env, buyer: Address, seller: Address, amount: i128) {
        buyer.require_auth();
        env.storage().instance().set(&BUYER, &buyer);
        env.storage().instance().set(&SELLER, &seller);
        env.storage().instance().set(&AMOUNT, &amount);
        env.storage().instance().set(&LOCKED, &true);
    }

    pub fn release(env: Env, buyer: Address) {
        buyer.require_auth();
        let stored_buyer: Address = env.storage().instance().get(&BUYER).unwrap();
        assert!(buyer == stored_buyer, "only buyer can release");
        env.storage().instance().set(&LOCKED, &false);
    }

    pub fn refund(env: Env, seller: Address) {
        seller.require_auth();
        let stored_seller: Address = env.storage().instance().get(&SELLER).unwrap();
        assert!(seller == stored_seller, "only seller can refund");
        env.storage().instance().set(&LOCKED, &false);
    }

    pub fn status(env: Env) -> bool {
        env.storage().instance().get(&LOCKED).unwrap_or(false)
    }
}
