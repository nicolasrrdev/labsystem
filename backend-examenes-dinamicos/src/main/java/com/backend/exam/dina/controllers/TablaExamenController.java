package com.backend.exam.dina.controllers;

import com.backend.exam.dina.models.Paciente;
import com.backend.exam.dina.models.TablaExamen;
import com.backend.exam.dina.models.TablaExamenCampo;
import com.backend.exam.dina.services.PacienteService;
import com.backend.exam.dina.services.TablaExamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tabla-examen")
public class TablaExamenController {

    private final TablaExamenService tablaExamenService;

    @Autowired
    public TablaExamenController(TablaExamenService tablaExamenService) {
        this.tablaExamenService = tablaExamenService;
    }

    @Autowired
    private PacienteService pacienteService;

    @PostMapping("/insertar/{pacienteId}")
    public ResponseEntity<String> insertarTablaExamen(@RequestBody List<String> valores, @PathVariable Integer pacienteId) {
        if (valores.size() != 3) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Debe proporcionar 3 valores");
        }

        Paciente paciente = pacienteService.obtenerPacientePorId(pacienteId);
        if (paciente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Paciente no encontrado");
        }

        LocalDateTime currentDateTime = LocalDateTime.now();
        TablaExamen tablaExamen = new TablaExamen();
        tablaExamen.setPaciente(paciente);
        tablaExamen.setTimestamp(currentDateTime);

        List<TablaExamenCampo> campos = new ArrayList<>();
        for (String valor : valores) {
            TablaExamenCampo campo = new TablaExamenCampo();
            campo.setCampo(valor);
            campo.setTablaExamen(tablaExamen);
            campos.add(campo);
        }

        tablaExamen.setCampos(campos);
        tablaExamenService.insertarTablaExamen(tablaExamen);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Registro exitoso");
    }


    @PutMapping("/actualizar/{tablaExamenId}")
    public ResponseEntity<String> actualizarTablaExamen(@PathVariable Integer tablaExamenId,
                                                        @RequestBody List<String> nuevosValores) {
        if (nuevosValores.size() != 3) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Debe proporcionar 3 valores");
        }
        TablaExamen tablaExamen = tablaExamenService.obtenerTablaExamenPorId(tablaExamenId);
        if (tablaExamen == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Registro no encontrado");
        }
        List<TablaExamenCampo> campos = tablaExamen.getCampos();
        if (campos.size() != nuevosValores.size()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("La cantidad de valores proporcionados no coincide con la cantidad de campos");
        }
        for (int i = 0; i < campos.size(); i++) {
            campos.get(i).setCampo(nuevosValores.get(i));
        }
        tablaExamen.setTimestamp(LocalDateTime.now());
        tablaExamenService.actualizarTablaExamen(tablaExamen);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Actualización exitosa");
    }

    @DeleteMapping("/eliminar/{tablaExamenId}")
    public ResponseEntity<String> eliminarTablaExamen(@PathVariable Integer tablaExamenId) {
        TablaExamen tablaExamen = tablaExamenService.obtenerTablaExamenPorId(tablaExamenId);
        if (tablaExamen == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Registro no encontrado");
        }

        tablaExamenService.eliminarTablaExamen(tablaExamen);

        return ResponseEntity.status(HttpStatus.OK)
                .body("Eliminación exitosa");
    }

}