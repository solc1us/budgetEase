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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import budgetEase.mainapp.models.MaxMonthlyOutcome;
import budgetEase.mainapp.repos.MaxMonthlyOutcomeRepo;
import budgetEase.mainapp.services.BudgetEaseService;
import budgetEase.mainapp.utils.MessageModel;
import budgetEase.mainapp.utils.MessageModelPagination;
import budgetEase.mainapp.utils.SortingAndAscendingDescending;

@RestController
@RequestMapping("/mmo")
public class MaxMonthlyOutcomeController {

  @Autowired
  MaxMonthlyOutcomeRepo maxMonthlyOutcomeRepo;

  @Autowired
  SortingAndAscendingDescending sortingAndAscendingDescending;

  @Autowired
  BudgetEaseService budgetEaseService;

  @PostMapping("/create")
  public ResponseEntity<Object> insertData(@RequestBody MaxMonthlyOutcome data) {

    MessageModel msg = new MessageModel();

    try {
      MaxMonthlyOutcome maxMonthlyOutcome = new MaxMonthlyOutcome();

      maxMonthlyOutcome.setId_users(data.getId_users());
      maxMonthlyOutcome.setNominal(data.getNominal());
      maxMonthlyOutcome.setDate_created(LocalDateTime.now());

      maxMonthlyOutcomeRepo.save(maxMonthlyOutcome);

      msg.setMessage("Success");
      msg.setData(maxMonthlyOutcome);

      return ResponseEntity.status(HttpStatus.OK).body(msg);

    } catch (

    Exception e) {
      msg.setMessage(e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
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

      Page<MaxMonthlyOutcome> data = maxMonthlyOutcomeRepo.findAll(pageRequest);

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

  @GetMapping("/find")
  public ResponseEntity<Object> findMaxMonthlyOutcome(
      @RequestParam(value = "idUsers", required = true) String idUsers,
      @RequestParam(value = "getLast", required = false) Boolean getLast) {

    MessageModel msg = new MessageModel();

    try {

      if (idUsers.isEmpty() || idUsers == null) {
        msg.setMessage("'idUsers' is required in the request param.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

      List<MaxMonthlyOutcome> maxMonthlyOutcomes = maxMonthlyOutcomeRepo.findTopByIdUsers(idUsers);

      // Check if getLast is true and the list has elements
      if (getLast != null && getLast && !maxMonthlyOutcomes.isEmpty()) {
        // Return only the first element
        Optional<MaxMonthlyOutcome> firstOutcomeOptional = maxMonthlyOutcomes.stream().findFirst();

        // Check if the Optional contains a value
        if (firstOutcomeOptional.isPresent()) {
          MaxMonthlyOutcome firstOutcome = firstOutcomeOptional.get();
          msg.setMessage("Sukses (1 data)");
          msg.setData(firstOutcome);
        } else {
          msg.setMessage("Data not found");
        }
      } else {
        msg.setMessage("Sukses (Semua data)");
        msg.setData(maxMonthlyOutcomes);
      }

      return ResponseEntity.ok(msg);

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  @GetMapping("/findbyid/{id}")
  public ResponseEntity<Object> findMaxMonthlyOutcomeById(
      @PathVariable("id") String id) {

    MessageModel msg = new MessageModel();

    try {

      if (id.isEmpty() || id == null) {
        msg.setMessage("'id' is required in the request param.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

      Optional<MaxMonthlyOutcome> maxMonthlyOutcome = maxMonthlyOutcomeRepo.findById(id);

      if (!maxMonthlyOutcome.isPresent() || maxMonthlyOutcome == null) {
        msg.setMessage("'id' yang anda masukkan salah (tidak ada di database).");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

      msg.setMessage("Sukses");
      msg.setData(maxMonthlyOutcome);
      return ResponseEntity.ok(msg);

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  @DeleteMapping("/deletebatch")
  public ResponseEntity<Object> deleteItems(@RequestBody List<MaxMonthlyOutcome> id) {
    maxMonthlyOutcomeRepo.deleteAll(id);
    return ResponseEntity.status(HttpStatus.OK).body("Semua item berhasil dihapus");
  }

  @DeleteMapping("/deletebyid/{id}")
  public ResponseEntity<Object> deleteById(@PathVariable("id") String id) {

    MessageModel msg = new MessageModel();

    try {

      Optional<MaxMonthlyOutcome> maxMonthlyOutcome = maxMonthlyOutcomeRepo.findById(id);

      if (maxMonthlyOutcome.isPresent()) {

        maxMonthlyOutcomeRepo.deleteById(id);

        msg.setMessage("Berhasil menghapus yang ID nya: " + maxMonthlyOutcome.get().getId());
        msg.setData(maxMonthlyOutcome);
        return ResponseEntity.status(HttpStatus.OK).body(msg);
      } else {
        msg.setMessage("Tidak dapat menemukan maxMonthlyOutcome dengan id: " + id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

}
