package com.labsystem.controllers;
import com.labsystem.models.TablaExamen;
import com.labsystem.services.TablaExamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.sql.Timestamp;

@RestController
// @PreAuthorize("hasRole('ADMIN') or hasRole('EVALUADOR')")
// @PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/tabla_examen")
public class TablaExamenController {
    @Autowired
    private TablaExamenService tablaExamenService;

    @PreAuthorize("hasRole('ADMIN') or hasRole('EVALUADOR')")
    @GetMapping("/all")
    public ResponseEntity<List<TablaExamen>> obtenerTodosLosRegistros() {
        List<TablaExamen> registros = tablaExamenService.obtenerTodosLosRegistros();
        return ResponseEntity.ok(registros);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('EVALUADOR')")
    @GetMapping("/{id}")
    public ResponseEntity<TablaExamen> obtenerRegistroPorId(@PathVariable Integer id) {
        TablaExamen registro = tablaExamenService.obtenerRegistroPorId(id);
        if (registro != null) {
            return ResponseEntity.ok(registro);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('EVALUADOR')")
    @GetMapping("/por_paciente/{pacienteId}")
    public ResponseEntity<List<TablaExamen>> obtenerRegistrosPorPacienteId(@PathVariable Integer pacienteId) {
        List<TablaExamen> registros = tablaExamenService.obtenerRegistrosPorPacienteId(pacienteId);
        return ResponseEntity.ok(registros);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('EVALUADOR')")
    @PostMapping("/post")
    public ResponseEntity<TablaExamen> insertarRegistro(@RequestBody TablaExamen tablaExamen) {
        tablaExamen.setTimestampColumn(new Timestamp(System.currentTimeMillis()));
        TablaExamen nuevoRegistro = tablaExamenService.insertarRegistro(tablaExamen);
        return ResponseEntity.ok(nuevoRegistro);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('EVALUADOR')")
    @PutMapping("/{id}")
    public ResponseEntity<TablaExamen> editarRegistro(@PathVariable Integer id, @RequestBody TablaExamen tablaExamen) {
        tablaExamen.setTimestampColumn(new Timestamp(System.currentTimeMillis()));
        TablaExamen registroActualizado = tablaExamenService.editarRegistro(id, tablaExamen);
        return ResponseEntity.ok(registroActualizado);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarRegistro(@PathVariable Integer id) {
        tablaExamenService.eliminarRegistro(id);
        return ResponseEntity.noContent().build();
    }

}
