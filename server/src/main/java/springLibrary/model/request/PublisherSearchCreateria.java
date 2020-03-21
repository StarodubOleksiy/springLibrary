package springLibrary.model.request;


import lombok.Data;

@Data
public class PublisherSearchCreateria {

    String searchWord;
    boolean findByCity;

    public String getSearchWord() {
        return searchWord;
    }

    public boolean isFindByCity() {
        return findByCity;
    }

    @Override
    public String toString() {
        return "PublisherSearchCreateria{" +
                "searchWord='" + searchWord + '\'' +
                ", findByCity=" + findByCity +
                '}';
    }
}
