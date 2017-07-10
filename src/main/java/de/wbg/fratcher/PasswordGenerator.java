package de.wbg.fratcher;

import org.apache.commons.codec.digest.DigestUtils;

public class PasswordGenerator {

	private static String salt = "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e";
	private static String password = "foo";
	
	public static void main(String[] args) {
		System.out.println(hashPassword(password));
	}
	
	private static String hashPassword(String password) {
        return DigestUtils.sha512Hex(salt + password);

    }

}
