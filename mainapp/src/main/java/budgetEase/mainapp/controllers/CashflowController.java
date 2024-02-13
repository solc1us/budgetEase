package budgetEase.mainapp.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
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

import budgetEase.mainapp.models.Cashflow;
import budgetEase.mainapp.repos.CashflowRepo;
import budgetEase.mainapp.services.BudgetEaseService;
import budgetEase.mainapp.utils.MessageModel;
import budgetEase.mainapp.utils.MessageModelPagination;
import budgetEase.mainapp.utils.SortingAndAscendingDescending;

@RestController
@RequestMapping("/cashflow")
public class CashflowController {

  @Autowired
  CashflowRepo cashflowRepo;

  @Autowired
  BudgetEaseService budgetEaseService;

  @Autowired
  SortingAndAscendingDescending sortingAndAscendingDescending;

  @PostMapping("/create")
  public ResponseEntity<Object> insertData(@RequestBody Cashflow data) {

    MessageModel msg = new MessageModel();

    try {
      Cashflow cashflow = new Cashflow();

      cashflow.setId_users(data.getId_users());
      cashflow.setArus(data.getArus());
      cashflow.setNominal(data.getNominal());
      cashflow.setKategori(data.getKategori());
      cashflow.setKeterangan(data.getKeterangan());
      cashflow.setTanggal(data.getTanggal());

      cashflowRepo.save(cashflow);

      msg.setMessage("Success");
      msg.setData(cashflow);

      return ResponseEntity.status(HttpStatus.OK).body(msg);

    } catch (

    Exception e) {
      msg.setMessage(e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
    }
  }

  @PutMapping("/update")
  public ResponseEntity<Object> updateBatch(@RequestBody Cashflow param) {

    MessageModel msg = new MessageModel();

    try {

      if (param.getId().isEmpty() || param.getId().trim().length() < 1) {
        return ResponseEntity.badRequest().body("ID is required in the request body.");
      }

      Optional<Cashflow> existingCashflow = cashflowRepo.findById(param.getId());

      if (existingCashflow.isPresent()) {
        Cashflow cashflowToUpdate = existingCashflow.get();

        cashflowToUpdate.setArus(param.getArus());
        cashflowToUpdate.setNominal(param.getNominal());
        cashflowToUpdate.setKategori(param.getKategori());
        cashflowToUpdate.setKeterangan(param.getKeterangan());
        cashflowToUpdate.setTanggal(param.getTanggal());
        cashflowRepo.save(cashflowToUpdate);

        msg.setMessage("Sukses");
        msg.setData(cashflowToUpdate);

      } else {
        msg.setMessage("Cashflow dengan ID " + param.getId() + " tidak ditemukan.");
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

      Page<Cashflow> data = cashflowRepo.findAll(pageRequest);

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
  public ResponseEntity<Object> findCashflow(
      @RequestParam(value = "idUsers", required = true) String idUsers,
      @RequestParam(value = "dateFrom", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
      @RequestParam(value = "dateTo", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo,
      @RequestParam(value = "arus", required = false) String arus,
      @RequestParam(value = "kategori", required = false) String kategori) {

    MessageModel msg = new MessageModel();

    try {

      if (idUsers.isEmpty() || idUsers.trim().length() < 1 || idUsers.isBlank()) {
        msg.setMessage("'idUsers' is required in the request param.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

      if (dateTo != null && dateFrom == null) {
        msg.setMessage("'dateFrom' is required if you insert 'dateTo'.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

      List<Cashflow> cashflow = cashflowRepo.findByIdUsers(idUsers);

      List<Cashflow> filteredCashflows = new ArrayList<>(cashflow);

      if (arus != null && !arus.isEmpty()) {
        filteredCashflows.retainAll(budgetEaseService.findCashflowByArus(filteredCashflows, arus));
      }

      if (dateFrom != null) {
        LocalDateTime dateFromAddTime = dateFrom.atTime(LocalTime.MIN);
        LocalDateTime dateToAddTime;

        if (dateTo == null) {
          dateToAddTime = dateFrom.atTime(LocalTime.MAX);
        } else {
          dateToAddTime = dateTo.atTime(LocalTime.MAX);
        }
        filteredCashflows.retainAll(budgetEaseService.findCashflowByDateRange(filteredCashflows, dateFromAddTime, dateToAddTime));
      }

      if (kategori != null && !kategori.isEmpty()) {
        filteredCashflows.retainAll(budgetEaseService.findCashflowByKategori(filteredCashflows, kategori));
      }

      msg.setMessage("Sukses");
      msg.setData(filteredCashflows);
      return ResponseEntity.ok(msg);

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  @DeleteMapping("/deletebatch")
  public ResponseEntity<Object> deleteItems(@RequestBody List<Cashflow> id) {
    cashflowRepo.deleteAll(id);
    return ResponseEntity.status(HttpStatus.OK).body("Semua item berhasil dihapus");
  }

}