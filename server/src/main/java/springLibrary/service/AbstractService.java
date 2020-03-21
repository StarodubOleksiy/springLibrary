package springLibrary.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import springLibrary.controller.GenreController;


import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.List;
import java.util.Optional;

public abstract class AbstractService<T, ID extends Serializable, R extends JpaRepository<T, ID>> implements Service<T, ID, R> {

    protected final R repository;

    private static final Logger LOGGER = LoggerFactory.getLogger(AbstractService.class);

    protected AbstractService(R repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public void delete(T entity) {
        repository.delete(entity);
    }

    @Override
    @Transactional
    public void save(T entity) {
        LOGGER.info("==============why are you not working ======================== ");
        repository.save(entity);
    }




    @Override
    public Optional<T> findById(ID id) {
        return repository.findById(id);
    }

    @Override
    public List<T> findAll() {
        return repository.findAll();
    }

    @Override
    public R getRepository() {
        return repository;
    }

    @Override
    public T getOne(ID id) {
        return repository.getOne(id);
          }




}