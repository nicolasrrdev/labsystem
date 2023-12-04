package com.labsystem.controllers;
import com.labsystem.models.Paciente;
import com.labsystem.repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RestController
@PreAuthorize("hasRole('ADMIN') or hasRole('EVALUADOR')")
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    public class ErrorResponse {
        private String error;
        public ErrorResponse(String error) {
            this.error = error;
        }
        public String getError() {
            return error;
        }
        public void setError(String error) {
            this.error = error;
        }
    }

    public class ApiResponse<T> {
        private T data;
        private String error;
        public ApiResponse(T data) {
            this.data = data;
        }
        public ApiResponse(String error) {
            this.error = error;
        }
        public T getData() {
            return data;
        }
        public String getError() {
            return error;
        }
    }

    @PostMapping
    public ResponseEntity<String> registrarPaciente(@RequestBody @Valid Paciente paciente) {
        pacienteRepository.save(paciente);
        return new ResponseEntity<>("El paciente ha sido creado correctamente.", HttpStatus.CREATED);
    }

    @GetMapping("")
    public List<Map<String, Object>> obtenerPacientes() {
        List<Paciente> pacientes = pacienteRepository.findAll();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return pacientes.stream().map(paciente -> {
            Map<String, Object> pacienteMap = new LinkedHashMap<>();
            pacienteMap.put("id", paciente.getId());
            pacienteMap.put("nombres", paciente.getNombres());
            pacienteMap.put("apellidos", paciente.getApellidos());
            pacienteMap.put("tipoDocumento", paciente.getTipoDocumento());
            pacienteMap.put("documento", paciente.getDocumento());
            LocalDate fechaNacimiento = paciente.getFechaNacimiento();
            if (fechaNacimiento != null) {
                String fechaNacimientoFormateada = fechaNacimiento.format(dateFormatter);
                pacienteMap.put("fechaNacimiento", fechaNacimientoFormateada);
            }
            pacienteMap.put("email", paciente.getEmail());
            pacienteMap.put("genero", paciente.getGenero());
            return pacienteMap;
        }).collect(Collectors.toList());
    }

    @RestControllerAdvice
    public class ExceptionController {
        private String extractColumnNameFromErrorMessage(String errorMessage) {
            Pattern patternEnglish = Pattern.compile("Key \\((.*?)\\)=.*?already exists");
            Matcher matcherEnglish = patternEnglish.matcher(errorMessage);
            if (matcherEnglish.find()) {
                return matcherEnglish.group(1);
            } else {
                Pattern patternSpanish = Pattern.compile("Ya existe la llave \\((.*?)\\)=.*?");
                Matcher matcherSpanish = patternSpanish.matcher(errorMessage);
                if (matcherSpanish.find()) {
                    return matcherSpanish.group(1);
                }
            }
            return null;
        }
        @ExceptionHandler(DataIntegrityViolationException.class)
        public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
            String errorMessage = ex.getRootCause().getMessage();
            String columnName = extractColumnNameFromErrorMessage(errorMessage);
            if (columnName != null) {
                errorMessage = "El " + columnName + " ya se encuentra registrado";
            } else {
                errorMessage = ex.getMostSpecificCause().getMessage();
            }
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @RestControllerAdvice
    public class GlobalExceptionHandler {
        @ExceptionHandler(MethodArgumentNotValidException.class)
        @ResponseStatus(HttpStatus.BAD_REQUEST)
        public ErrorResponse handleValidationException(MethodArgumentNotValidException ex) {
            BindingResult result = ex.getBindingResult();
            List<FieldError> fieldErrors = result.getFieldErrors();
            String errorMessage = fieldErrors.get(0).getDefaultMessage();
            FieldError firstFieldError = fieldErrors.get(0);
            String fieldName = firstFieldError.getField();
            return new ErrorResponse(fieldName + " " + errorMessage);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPacientePorId(@PathVariable Integer id) {
        Optional<Paciente> pacienteOptional = pacienteRepository.findById(id);
        Paciente paciente = pacienteOptional.orElse(null);
        if (paciente != null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("id", paciente.getId());
            response.put("nombres", paciente.getNombres());
            response.put("apellidos", paciente.getApellidos());
            response.put("tipoDocumento", paciente.getTipoDocumento());
            response.put("documento", paciente.getDocumento());
            LocalDate fechaNacimiento = paciente.getFechaNacimiento();
            if (fechaNacimiento != null) {
                DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                String fechaNacimientoFormateada = fechaNacimiento.format(dateFormatter);
                response.put("fechaNacimiento", fechaNacimientoFormateada);
            }
            response.put("email", paciente.getEmail());
            response.put("genero", paciente.getGenero());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ErrorResponse errorResponse = new ErrorResponse("Paciente no encontrado");
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<ApiResponse<Paciente>> actualizarPaciente(@PathVariable Integer id, @RequestBody @Valid Paciente pacienteDatosActualizados) {
        Optional<Paciente> pacienteOptional = pacienteRepository.findById(id);
        if (pacienteOptional.isPresent()) {
            Paciente pacienteExistente = pacienteOptional.get();
            pacienteExistente.setNombres(pacienteDatosActualizados.getNombres());
            pacienteExistente.setApellidos(pacienteDatosActualizados.getApellidos());
            pacienteExistente.setTipoDocumento(pacienteDatosActualizados.getTipoDocumento());
            pacienteExistente.setDocumento(pacienteDatosActualizados.getDocumento());
            pacienteExistente.setFechaNacimiento(pacienteDatosActualizados.getFechaNacimiento());
            pacienteExistente.setEmail(pacienteDatosActualizados.getEmail());
            pacienteExistente.setGenero(pacienteDatosActualizados.getGenero());
            Paciente pacienteActualizado = pacienteRepository.save(pacienteExistente);
            ApiResponse<Paciente> response = new ApiResponse<>(pacienteActualizado);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ApiResponse<Paciente> response = new ApiResponse<>("Paciente no encontrado");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

}
