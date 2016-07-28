package csql.util.security;

import org.jasypt.util.text.BasicTextEncryptor;
import org.springframework.security.crypto.keygen.KeyGenerators;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Crypto {

    final static String salt = KeyGenerators.string().generateKey();
    final static String passphrase = "7h15i$P@s5w0rD";


    public static String encrypt(String clearText) {
        BasicTextEncryptor textEncryptor = new BasicTextEncryptor();
        textEncryptor.setPassword(passphrase);
        return textEncryptor.encrypt(clearText);
    }

    public static String decrypt(String cipherText) {
        BasicTextEncryptor textEncryptor = new BasicTextEncryptor();
        textEncryptor.setPassword(passphrase);
        return textEncryptor.decrypt(cipherText);
    }

    public static String md5Hash(String text) {
        byte[] by = text.getBytes();
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return encrypt(text);
        }
        md.reset();
        md.update(by);
        byte messageDigest[] = md.digest();
        StringBuffer buffer = new StringBuffer();
        for (int i = 0; i < messageDigest.length; i++) {
            buffer.append(Integer.toHexString(0xFF & messageDigest[i]));
        }
        return buffer.toString();
    }


}
