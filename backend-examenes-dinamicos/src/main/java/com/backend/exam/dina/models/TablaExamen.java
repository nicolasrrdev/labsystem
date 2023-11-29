package com.backend.exam.dina.models;
import javax.persistence.*;
import java.sql.Timestamp;
@Entity
@Table(name = "tablaExamen")
public class TablaExamen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "paciente_id")
    private Integer pacienteId;
    @Column(name = "campo1")
    private String campo1;
    @Column(name = "campo2")
    private String campo2;
    @Column(name = "campo3")
    private String campo3;
    @Column(name = "timestamp_column", columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Timestamp timestampColumn;
    public TablaExamen() {
    }
    public TablaExamen(Integer pacienteId, String campo1, String campo2, String campo3, Timestamp timestampColumn) {
        this.pacienteId = pacienteId;
        this.campo1 = campo1;
        this.campo2 = campo2;
        this.campo3 = campo3;
        this.timestampColumn = timestampColumn;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getPacienteId() {
        return pacienteId;
    }
    public void setPacienteId(Integer pacienteId) {
        this.pacienteId = pacienteId;
    }
    public String getCampo1() {
        return campo1;
    }
    public void setCampo1(String campo1) {
        this.campo1 = campo1;
    }
    public String getCampo2() {
        return campo2;
    }
    public void setCampo2(String campo2) {
        this.campo2 = campo2;
    }
    public String getCampo3() {
        return campo3;
    }
    public void setCampo3(String campo3) {
        this.campo3 = campo3;
    }
    public Timestamp getTimestampColumn() { return timestampColumn; }
    public void setTimestampColumn(Timestamp timestampColumn) { this.timestampColumn = timestampColumn; }
}
