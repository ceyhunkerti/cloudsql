import org.crsh.cli.Argument
import org.crsh.cli.Command
import org.crsh.cli.Usage

import csql.util.security.Crypto;

class decrypt {

    @Command
    @Usage("decrypt given string")
    String main( @Usage("text to be decrypted") @Argument String cipher) {
        return Crypto.decrypt(cipher);
    }
}
