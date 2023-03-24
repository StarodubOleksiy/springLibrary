package springLibrary.enums;

public enum Type {
    BOOK("BOOK"),
    CDROM("CDROM"),
    MAGAZINE("MAGAZINE"),
    PCHDD("PCHDD");

    private String name;

    Type(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public static Type StringToEnum(String type) {
        return Type.valueOf(type);
    }

    public static String enumToString(Type type) {
        return type.getName();
    }


}

