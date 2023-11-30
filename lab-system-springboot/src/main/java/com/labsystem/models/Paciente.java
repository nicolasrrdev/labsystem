package com.labsystem.models;

import jakarta.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Entity
@Table(name = "pacientes")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombres", length = 50)
    @NotBlank()
    private String nombres;

    @Column(name = "apellidos", length = 50)
    @NotBlank()
    private String apellidos;

    @Column(name = "tipo_documento")
    @Enumerated(EnumType.STRING)
    private TipoDocumento tipoDocumento;
    public enum TipoDocumento { CEDULA_DE_CIUDADANIA, CEDULA_DE_EXTRANJERIA, PASAPORTE, REGISTRO_CIVIL, TARJETA_DE_IDENTIDAD }

    @Column(name = "documento", unique = true)
    @NotNull()
    private Integer documento;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "email", unique = true)
    @NotBlank()
    @Pattern(regexp = "^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", message = "inválido")
    private String email;

    @Column(name = "genero")
    @Enumerated(EnumType.STRING)
    private Genero genero;
    public enum Genero { MASCULINO, FEMENINO, OTRO }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombres() {
        return nombres;
    }
    public void setNombres(String nombres) {
        this.nombres = nombres;
    }
    public String getApellidos() {
        return apellidos;
    }
    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }
    public TipoDocumento getTipoDocumento() { return tipoDocumento; }
    public void setTipoDocumento(TipoDocumento tipoDocumento) { this.tipoDocumento = tipoDocumento; }
    public Integer getDocumento() { return documento; }
    public void setDocumento(Integer documento) { this.documento = documento; }
    public LocalDate getFechaNacimiento() { return fechaNacimiento; }
    public void setFechaNacimiento(LocalDate fechaNacimiento) { this.fechaNacimiento = fechaNacimiento; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Genero getGenero() { return genero; }
    public void setGenero(Genero genero) { this.genero = genero; }

}