package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.Program;
import io.github.jhipster.application.repository.ProgramRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.application.domain.Program}.
 */
@RestController
@RequestMapping("/api")
public class ProgramResource {

    private final Logger log = LoggerFactory.getLogger(ProgramResource.class);

    private static final String ENTITY_NAME = "program";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProgramRepository programRepository;

    public ProgramResource(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    /**
     * {@code POST  /programs} : Create a new program.
     *
     * @param program the program to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new program, or with status {@code 400 (Bad Request)} if the program has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/programs")
    public ResponseEntity<Program> createProgram(@RequestBody Program program) throws URISyntaxException {
        log.debug("REST request to save Program : {}", program);
        if (program.getId() != null) {
            throw new BadRequestAlertException("A new program cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Program result = programRepository.save(program);
        return ResponseEntity.created(new URI("/api/programs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /programs} : Updates an existing program.
     *
     * @param program the program to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated program,
     * or with status {@code 400 (Bad Request)} if the program is not valid,
     * or with status {@code 500 (Internal Server Error)} if the program couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/programs")
    public ResponseEntity<Program> updateProgram(@RequestBody Program program) throws URISyntaxException {
        log.debug("REST request to update Program : {}", program);
        if (program.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Program result = programRepository.save(program);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, program.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /programs} : get all the programs.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of programs in body.
     */
    @GetMapping("/programs")
    public ResponseEntity<List<Program>> getAllPrograms(Pageable pageable) {
        log.debug("REST request to get a page of Programs");
        Page<Program> page = programRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /programs/:id} : get the "id" program.
     *
     * @param id the id of the program to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the program, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/programs/{id}")
    public ResponseEntity<Program> getProgram(@PathVariable Long id) {
        log.debug("REST request to get Program : {}", id);
        Optional<Program> program = programRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(program);
    }

    /**
     * {@code DELETE  /programs/:id} : delete the "id" program.
     *
     * @param id the id of the program to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/programs/{id}")
    public ResponseEntity<Void> deleteProgram(@PathVariable Long id) {
        log.debug("REST request to delete Program : {}", id);
        programRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
