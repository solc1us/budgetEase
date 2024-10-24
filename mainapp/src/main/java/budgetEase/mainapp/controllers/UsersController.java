package budgetEase.mainapp.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import budgetEase.mainapp.models.Users;
import budgetEase.mainapp.repos.UsersRepo;
import budgetEase.mainapp.utils.MessageModel;
import budgetEase.mainapp.utils.MessageModelPagination;
import budgetEase.mainapp.utils.SortingAndAscendingDescending;

@RestController
@RequestMapping("/users")
public class UsersController {

  @Autowired
  UsersRepo usersRepo;

  @Autowired
  SortingAndAscendingDescending sortingAndAscendingDescending;

  @PostMapping("/create")
  public ResponseEntity<Object> insertData(@RequestBody Users data) {

    MessageModel msg = new MessageModel();

    try {
      Users users = new Users();

      users.setUsername(data.getUsername());
      users.setPassword(data.getPassword());
      users.setEmail(data.getEmail());
      users.setNo_hp(data.getNo_hp());
      users.setDate_created(LocalDateTime.now());

      usersRepo.save(users);

      msg.setMessage("Success");
      msg.setData(users);

      return ResponseEntity.status(HttpStatus.OK).body(msg);

    } catch (

    Exception e) {
      msg.setMessage(e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
    }
  }

  @PutMapping("/update")
  public ResponseEntity<Object> updateBatch(@RequestBody Users param) {

    MessageModel msg = new MessageModel();

    try {

      if (param.getId().isEmpty() || param.getId().trim().length() < 1) {
        return ResponseEntity.badRequest().body("ID is required in the request body.");
      }

      Optional<Users> existingUsers = usersRepo.findById(param.getId());

      if (existingUsers.isPresent()) {
        Users usersToUpdate = existingUsers.get();

        usersToUpdate.setUsername(param.getUsername());
        usersToUpdate.setPassword(param.getPassword());
        usersToUpdate.setEmail(param.getEmail());
        usersToUpdate.setNo_hp(param.getNo_hp());
        usersToUpdate.setDate_created(LocalDateTime.now());
        usersRepo.save(usersToUpdate);

        msg.setMessage("Sukses");
        msg.setData(usersToUpdate);

      } else {
        msg.setMessage("Users dengan ID " + param.getId() + " tidak ditemukan.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

      return ResponseEntity.status(HttpStatus.OK).body(msg);

    } catch (Exception e) {
      msg.setMessage(e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(msg);
    }
  }

  @GetMapping("/findall")
  public ResponseEntity<MessageModelPagination> getDataPagination(
      @RequestParam(value = "page", defaultValue = "0") Integer page,
      @RequestParam(value = "size", defaultValue = "10") Integer size,
      @RequestParam(value = "sort", required = false) String sort,
      @RequestParam(value = "urutan", required = false) String urutan) {
    MessageModelPagination msg = new MessageModelPagination();
    try {
      Sort objSort = sortingAndAscendingDescending.getSortingData(sort, urutan);
      Pageable pageRequest = objSort == null ? PageRequest.of(page, size) : PageRequest.of(page, size, objSort);

      Page<Users> data = usersRepo.findAll(pageRequest);

      msg.setMessage("Success");
      msg.setData(data.getContent());
      msg.setTotalPages(data.getTotalPages());
      msg.setCurrentPage(data.getNumber());
      msg.setTotalItems((int) data.getTotalElements());
      msg.setNumberOfElement(data.getNumberOfElements());

      return ResponseEntity.status(HttpStatus.OK).body(msg);
    } catch (Exception e) {
      msg.setMessage(e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
    }
  }

  @DeleteMapping("/deletebatch")
  public ResponseEntity<Object> deleteItems(@RequestBody List<Users> id) {
    usersRepo.deleteAll(id);
    return ResponseEntity.status(HttpStatus.OK).body("Semua item berhasil dihapus");
  }

}