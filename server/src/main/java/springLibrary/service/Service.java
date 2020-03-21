package springLibrary.service;


import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;


public interface Service<T, ID extends Serializable, R extends JpaRepository<T, ID>>   {

    void delete(T entity);

    void save(T entity);

    List<T> findAll();

    R getRepository();

   T getOne(ID id);

    Optional<T> findById(ID id);

    //public T getById(ID id);


    // List<T> saveAll(Iterable<T> iterable);

}