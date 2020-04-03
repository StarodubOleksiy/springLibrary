package springLibrary.model.response;


import lombok.Data;

import java.math.BigDecimal;

@Data
public class GenreResponse implements Comparable<GenreResponse> {
    private Long id;
    private String name;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public int compareTo(GenreResponse o) {
        int result = this.name.compareTo(o.name);
         return result;
    }

}
