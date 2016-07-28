package csql.model.util;

import java.util.ArrayList;
import java.util.List;

public class TreeNode {

    private boolean leaf;
    private Object data;
    private String text;
    private List<TreeNode> children;

    public TreeNode(String text) {
        this.text = text;
        this.children = new ArrayList();
    }

    public TreeNode(String text, boolean leaf,Object data) {
        this.leaf = leaf;
        this.data = data;
        this.text = text;
        this.children = new ArrayList();
    }

    public TreeNode addChild(TreeNode child) {
        this.children.add(child);
        return child;
    }


    public boolean hasChildren() {
        return this.children.size() > 0;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }


    public  List<TreeNode> getChildren() {
        return this.children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }

    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }


}
