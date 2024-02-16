package budgetEase.mainapp.controllers;

import org.springframework.web.bind.annotation.RestController;

import budgetEase.mainapp.models.Users;
import budgetEase.mainapp.repos.UsersRepo;
import budgetEase.mainapp.services.BudgetEaseService;
import budgetEase.mainapp.utils.MessageModel;

import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/main")
public class BudgetEaseController {

  @Autowired
  BudgetEaseService budgetEaseService;

  @Autowired
  UsersRepo usersRepo;

  @PostMapping("/login")
  public ResponseEntity<Object> loginUser(@RequestBody Users data) {

    MessageModel msg = new MessageModel();

    try {

      Optional<Users> user = usersRepo.findByUsername(data.getUsername());

      if (!user.isPresent()) {
        msg.setMessage("Username belum terdaftar.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

      if (!user.get().getPassword().equals(data.getPassword())) {
        msg.setMessage("Password anda salah.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

      Users userUpdateLogin = user.get();

      userUpdateLogin.setLast_login(LocalDateTime.now());
      usersRepo.save(userUpdateLogin);

      msg.setMessage("Anda berhasil login!");
      msg.setData(user);

      return ResponseEntity.status(HttpStatus.OK).body(msg);

    } catch (

    Exception e) {
      msg.setMessage(e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
    }
  }

  @PostMapping("/register")
  public ResponseEntity<Object> registerUser(@RequestBody Users data) {

    MessageModel msg = new MessageModel();

    try {

      Optional<Users> usernameCheck = usersRepo.findByUsername(data.getUsername());
      
      if (usernameCheck.isPresent()) {
        msg.setMessage("Username sudah ada.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

      Users users = new Users();

      users.setUsername(data.getUsername());
      users.setPassword(data.getPassword());
      users.setEmail(data.getEmail());
      users.setNo_hp(data.getNo_hp());
      users.setCreated_date(LocalDateTime.now());

      usersRepo.save(users);

      msg.setMessage("Anda berhasil mendaftar!");
      msg.setData(users);

      return ResponseEntity.status(HttpStatus.OK).body(msg);

    } catch (

    Exception e) {
      msg.setMessage(e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
    }
  }

}
