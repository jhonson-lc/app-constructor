package com.example.backend.Repository;

import com.example.backend.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByUserIdOrderByDateAsc(Long userId);

    List<Task> findAllByFinishedTrueAndUserIdOrderByDateAsc(Long userId);

    List<Task> findAllByFinishedFalseAndUserIdOrderByDateAsc(Long userId);

    List<Task> findAllByImportantTrueAndUserIdOrderByDateAsc(Long userId);

}