package csql.model.datastore;

import csql.type.ScriptType;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

public class Script {

    private String script;

    @Enumerated(EnumType.STRING)
    private ScriptType scriptType;

    private Object description;


    public Script() {
    }

    public Script(String script, ScriptType scriptType, Object description) {
        this.script = script;
        this.scriptType = scriptType;
        this.description = description;
    }




    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public ScriptType getScriptType() {
        return scriptType;
    }

    public void setScriptType(ScriptType scriptType) {
        this.scriptType = scriptType;
    }

    public Object getDescription() {
        return description;
    }

    public void setDescription(Object description) {
        this.description = description;
    }
}
