package com.example.backend.Service;

import com.example.backend.DTO.TaskDTO;
import com.example.backend.Entity.Task;
import com.example.backend.Entity.User;
import com.example.backend.Mapper.TaskMapper;
import com.example.backend.Repository.TaskRepository;
import com.example.backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {

    private final Logger log = LoggerFactory.getLogger(TaskServiceImpl.class);

    private final TaskRepository repository;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<TaskDTO> findById(Long taskId) {
        Optional<Task> optionalTask = repository.findById(taskId);

        if (optionalTask.isEmpty()){
            log.warn("Trying to get a non exist task");
            return ResponseEntity.notFound().build();
        }

        Task result = optionalTask.get();
        TaskDTO response = TaskMapper.toTaskDTO(result);

        return ResponseEntity.ok(response);
    }

    @Override
    public List<TaskDTO> findByUserId(Long userId) {
        List<Task> tasks = repository.findAllByUserIdOrderByDateAsc(userId);
        List<TaskDTO> taskDTOS = tasks.stream().map(TaskMapper::toTaskDTO).toList();
        return taskDTOS;
    }

    @Override
    public List<TaskDTO> findByImportant(Long userId) {
        List<Task> tasks = repository.findAllByImportantTrueAndUserIdOrderByDateAsc(userId);
        List<TaskDTO> taskDTOS = tasks.stream().map(TaskMapper::toTaskDTO).toList();
        return taskDTOS;
    }

    @Override
    public List<TaskDTO> findByFinished(Long userId) {
        List<Task> tasks = repository.findAllByFinishedTrueAndUserIdOrderByDateAsc(userId);
        List<TaskDTO> taskDTOS = tasks.stream().map(TaskMapper::toTaskDTO).toList();
        return taskDTOS;
    }

    @Override
    public List<TaskDTO> findByUnfinished(Long userId) {
        List<Task> tasks = repository.findAllByFinishedFalseAndUserIdOrderByDateAsc(userId);
        List<TaskDTO> taskDTOS = tasks.stream().map(TaskMapper::toTaskDTO).toList();
        return taskDTOS;
    }

    @Override
    public ResponseEntity<TaskDTO> create(TaskDTO taskDTO, Long userId) {

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()){
            log.warn("Trying to create a task with non-existent userId");
            return ResponseEntity.notFound().build();
        }

        if (taskDTO.getId() != null){
            log.warn("Trying to create a task with id");
            return ResponseEntity.badRequest().build();
        }

        User user = optionalUser.get();
        Task task = TaskMapper.toTask(taskDTO);
        task.setUser(user);
        Task result = repository.save(task);

        TaskDTO response = TaskMapper.toTaskDTO(result);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Override
    public ResponseEntity<TaskDTO> update(Task task, Long userId) {

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()){
            log.warn("Trying to create a task with non-existent userId");
            return ResponseEntity.notFound().build();
        }

        if (task.getId() == null){
            log.warn("Trying to update a task without id");
            return ResponseEntity.badRequest().build();
        }

        if (!repository.existsById(task.getId())){
            log.warn("Trying to update a non exists task");
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        task.setUser(user);
        Task result = repository.save(task);
        TaskDTO response = TaskMapper.toTaskDTO(result);

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<TaskDTO> updateFinishedStatus(Long taskId) {
        Task task = repository.findById(taskId).orElseThrow();

        task.setFinished(!task.getFinished());

        Task result = repository.save(task);
        TaskDTO response = TaskMapper.toTaskDTO(result);

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<TaskDTO> deleteById(Long taskId) {

        Optional<Task> optionalTask = repository.findById(taskId);

        if (optionalTask.isEmpty()){
            log.warn("Trying to delete a non exist task");
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(taskId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}