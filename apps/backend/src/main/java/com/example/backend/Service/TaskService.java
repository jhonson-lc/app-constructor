package com.example.backend.Service;

import com.example.backend.DTO.TaskDTO;
import com.example.backend.Entity.Task;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TaskService {

    ResponseEntity<TaskDTO> findById(Long taskId);

    List<TaskDTO> findByUserId(Long userId);

    List<TaskDTO> findByImportant(Long userId);

    List<TaskDTO>  findByFinished(Long userId);

    List<TaskDTO>  findByUnfinished(Long userId);

    ResponseEntity<TaskDTO> create(TaskDTO task, Long userId);

    ResponseEntity<TaskDTO> update(Task task, Long userId);

    ResponseEntity<TaskDTO> updateFinishedStatus(Long taskId);

    ResponseEntity<TaskDTO> deleteById(Long taskId);


}