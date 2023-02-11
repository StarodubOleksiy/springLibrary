package springLibrary.model.request;

import lombok.Data;
import springLibrary.entities.Author;
import springLibrary.entities.Publisher;

@Data
public class PublisherRequest {

    private Long id;
    private String name;
    private String city;

    public Publisher toPublisher() {
        Publisher publisher = new Publisher();
        publisher.setName(name);
        publisher.setCity(city);
        return publisher;
    }

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
    public String toString() {
        return "PublisherRequest{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                '}';
    }
}
