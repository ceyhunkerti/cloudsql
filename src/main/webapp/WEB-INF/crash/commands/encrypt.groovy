import org.crsh.cli.Argument
import org.crsh.cli.Command
import org.crsh.cli.Usage

import csql.util.security.Crypto;

class encrypt {

    @Command
    @Usage("encrypt given string")
    String main( @Usage("text to be encrypted") @Argument String cipher) {
        return Crypto.encrypt(cipher);
    }
}
