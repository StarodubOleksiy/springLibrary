package springLibrary.model.response;

import lombok.Data;

@Data
public class PublisherResponse implements Comparable<PublisherResponse> {
    private Long id;
    private String name;
    private String city;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public int compareTo(PublisherResponse o) {
        int result = this.name.compareTo(o.name);
        return result;
    }
}
