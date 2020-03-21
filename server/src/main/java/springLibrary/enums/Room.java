package springLibrary.enums;

/**
 * Created by Администратор on 25.02.18.
 */
public enum Room {
    FIRSTROOM("FIRSTROOM"),
    SECONDROOM("SECONDROOM"),
    THIRDROOM("THIRDROOM"),
    KITCHEN("KITCHEN");

    private String name;

    Room(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public static Room stringToEnum(String room) {
        switch (room) {
            case "FIRSTROOM":
                return FIRSTROOM;
            case "SECONDROOM":
                return SECONDROOM;
            case "THIRDROOM":
                return THIRDROOM;
            default:
                return KITCHEN;
        }
    }

    public static String enumToString(Room room) {
        return room.getName();
    }


}


