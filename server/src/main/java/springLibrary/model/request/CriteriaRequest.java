package springLibrary.model.request;


import lombok.Data;

@Data
public class CriteriaRequest {
    String searchWord;
    String type;

    public String getSearchWord() {
        return searchWord;
    }

    public String getType() {
        return type;
    }

    @Override
    public String toString() {
        return "CriteriaRequest{" +
                "searchWord='" + searchWord + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
