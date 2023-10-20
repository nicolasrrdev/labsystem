package com.backend.exam.dina.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "tablaExamen")
public class TablaExamen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;
    @OneToMany(mappedBy = "tablaExamen", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<TablaExamenCampo> campos = new ArrayList<>();
    @Column(name = "timestamp")
    private LocalDateTime timestamp;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Paciente getPaciente() {
        return paciente;
    }
    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }
    public List<TablaExamenCampo> getCampos() {
        return campos;
    }
    public void setCampos(List<TablaExamenCampo> campos) {
        this.campos = campos;
    }
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}