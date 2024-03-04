package budgetEase.mainapp.controllers;

import java.util.Collections;
import java.util.Comparator;
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

import budgetEase.mainapp.models.Kategori;
import budgetEase.mainapp.repos.KategoriRepo;
import budgetEase.mainapp.services.BudgetEaseService;
import budgetEase.mainapp.utils.MessageModel;
import budgetEase.mainapp.utils.MessageModelPagination;
import budgetEase.mainapp.utils.SortingAndAscendingDescending;

@RestController
@RequestMapping("/kategori")
public class KategoriController {

  @Autowired
  KategoriRepo kategoriRepo;

    @Autowired
  SortingAndAscendingDescending sortingAndAscendingDescending;

  @Autowired
  BudgetEaseService budgetEaseService;

  @PostMapping("/create")
  public ResponseEntity<Object> insertData(@RequestBody Kategori data) {

    MessageModel msg = new MessageModel();

    try {
      Kategori kategori = new Kategori();

      kategori.setId_users(data.getId_users());
      kategori.setKategori(data.getKategori());

      kategoriRepo.save(kategori);

      msg.setMessage("Success");
      msg.setData(kategori);

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

      Page<Kategori> data = kategoriRepo.findAll(pageRequest);

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
  public ResponseEntity<Object> findKategori(
      @RequestParam(value = "idUsers", required = true) String idUsers) {

    MessageModel msg = new MessageModel();

    try {

      if (idUsers.isEmpty() || idUsers == null) {
        msg.setMessage("'idUsers' is required in the request param.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

      List<Kategori> kategoris = kategoriRepo.findByIdUsers(idUsers);

      Collections.sort(kategoris, Comparator.comparing(Kategori::getKategori).reversed());

      msg.setMessage("Sukses");
      msg.setData(kategoris);
      return ResponseEntity.ok(msg);

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  @GetMapping("/findbyid/{id}")
  public ResponseEntity<Object> findKategoriById(
      @PathVariable("id") String id) {

    MessageModel msg = new MessageModel();

    try {

      if (id.isEmpty() || id == null) {
        msg.setMessage("'id' is required in the request param.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

      Optional<Kategori> kategori = kategoriRepo.findById(id);

      if (!kategori.isPresent() || kategori == null) {
        msg.setMessage("'id' yang anda masukkan salah (tidak ada di database).");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

      msg.setMessage("Sukses");
      msg.setData(kategori);
      return ResponseEntity.ok(msg);

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  @DeleteMapping("/deletebatch")
  public ResponseEntity<Object> deleteItems(@RequestBody List<Kategori> id) {
    kategoriRepo.deleteAll(id);
    return ResponseEntity.status(HttpStatus.OK).body("Semua item berhasil dihapus");
  }

  @DeleteMapping("/deletebyid")
  public ResponseEntity<Object> deleteById(@RequestBody Kategori data) {

    MessageModel msg = new MessageModel();

    try {

      Optional<Kategori> kategori = kategoriRepo.findById(data.getId());

      if (kategori.isPresent()) {

        kategoriRepo.deleteById(data.getId());

        msg.setMessage("Berhasil menghapus kategori : " + kategori.get().getKategori());
        msg.setData(kategori);
        return ResponseEntity.status(HttpStatus.OK).body(msg);
      } else {
        msg.setMessage("Tidak dapat menemukan kategori dengan id: " + data.getId());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
      }

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }
  
}
