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
        return Room.valueOf(room);
    }

    public static String enumToString(Room room) {
        return room.getName();
    }


}


