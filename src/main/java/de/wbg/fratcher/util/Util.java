package de.wbg.fratcher.util;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Value;

public class Util {

	@Value("${authenticationService.salt}")
    private String salt;
	
	 /**
     * Return (salt + password) hashed with SHA-512.
     *
     * The salt is configured in the property authenticationService.salt.
     *
     * @param password plain text password
     * @return hashed password
     */
	public String hashPassword(String password)
	{
		return DigestUtils.sha512Hex(salt + password);
	}
	
}
