package com.backend.exam.dina.services;
import com.backend.exam.dina.models.TablaExamen;
import com.backend.exam.dina.repositories.TablaExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;
import java.sql.Timestamp;
@Service
public class TablaExamenService {
    @Autowired
    private TablaExamenRepository tablaExamenRepository;
    public TablaExamen insertarRegistro(TablaExamen tablaExamen) {
        return tablaExamenRepository.save(tablaExamen);
    }
    public TablaExamen editarRegistro(Integer id, TablaExamen tablaExamen) {
        Optional<TablaExamen> optionalTablaExamen = tablaExamenRepository.findById(id);
        if (optionalTablaExamen.isPresent()) {
            TablaExamen registroExistente = optionalTablaExamen.get();

            registroExistente.setCampo1(tablaExamen.getCampo1());
            registroExistente.setCampo2(tablaExamen.getCampo2());
            registroExistente.setCampo3(tablaExamen.getCampo3());
            registroExistente.setCampo4(tablaExamen.getCampo4());
            registroExistente.setCampo5(tablaExamen.getCampo5());
            registroExistente.setCampo6(tablaExamen.getCampo6());
            registroExistente.setCampo7(tablaExamen.getCampo7());
            registroExistente.setCampo8(tablaExamen.getCampo8());
            registroExistente.setCampo9(tablaExamen.getCampo9());
            registroExistente.setCampo10(tablaExamen.getCampo10());
            registroExistente.setCampo11(tablaExamen.getCampo11());
            registroExistente.setCampo12(tablaExamen.getCampo12());
            registroExistente.setCampo13(tablaExamen.getCampo13());
            registroExistente.setCampo14(tablaExamen.getCampo14());
            registroExistente.setCampo15(tablaExamen.getCampo15());
            registroExistente.setCampo16(tablaExamen.getCampo16());
            registroExistente.setCampo17(tablaExamen.getCampo17());
            registroExistente.setCampo18(tablaExamen.getCampo18());
            registroExistente.setCampo19(tablaExamen.getCampo19());
            registroExistente.setCampo20(tablaExamen.getCampo20());
            registroExistente.setCampo21(tablaExamen.getCampo21());
            registroExistente.setCampo22(tablaExamen.getCampo22());
            registroExistente.setCampo23(tablaExamen.getCampo23());
            registroExistente.setCampo24(tablaExamen.getCampo24());
            registroExistente.setCampo25(tablaExamen.getCampo25());
            registroExistente.setCampo26(tablaExamen.getCampo26());
            registroExistente.setCampo27(tablaExamen.getCampo27());
            registroExistente.setCampo28(tablaExamen.getCampo28());
            registroExistente.setCampo29(tablaExamen.getCampo29());
            registroExistente.setCampo30(tablaExamen.getCampo30());
            registroExistente.setCampo31(tablaExamen.getCampo31());
            registroExistente.setCampo32(tablaExamen.getCampo32());
            registroExistente.setCampo33(tablaExamen.getCampo33());
            registroExistente.setCampo34(tablaExamen.getCampo34());
            registroExistente.setCampo35(tablaExamen.getCampo35());
            registroExistente.setCampo36(tablaExamen.getCampo36());
            registroExistente.setCampo37(tablaExamen.getCampo37());
            registroExistente.setCampo38(tablaExamen.getCampo38());
            registroExistente.setCampo39(tablaExamen.getCampo39());
            registroExistente.setCampo40(tablaExamen.getCampo40());
            registroExistente.setCampo41(tablaExamen.getCampo41());
            registroExistente.setCampo42(tablaExamen.getCampo42());
            registroExistente.setCampo43(tablaExamen.getCampo43());
            registroExistente.setCampo44(tablaExamen.getCampo44());
            registroExistente.setCampo45(tablaExamen.getCampo45());
            registroExistente.setCampo46(tablaExamen.getCampo46());
            registroExistente.setCampo47(tablaExamen.getCampo47());
            registroExistente.setCampo48(tablaExamen.getCampo48());
            registroExistente.setCampo49(tablaExamen.getCampo49());
            registroExistente.setCampo50(tablaExamen.getCampo50());
            registroExistente.setCampo51(tablaExamen.getCampo51());
            registroExistente.setCampo52(tablaExamen.getCampo52());
            registroExistente.setCampo53(tablaExamen.getCampo53());
            registroExistente.setCampo54(tablaExamen.getCampo54());
            registroExistente.setCampo55(tablaExamen.getCampo55());
            registroExistente.setCampo56(tablaExamen.getCampo56());
            registroExistente.setCampo57(tablaExamen.getCampo57());
            registroExistente.setCampo58(tablaExamen.getCampo58());
            registroExistente.setCampo59(tablaExamen.getCampo59());
            registroExistente.setCampo60(tablaExamen.getCampo60());
            registroExistente.setCampo61(tablaExamen.getCampo61());
            registroExistente.setCampo62(tablaExamen.getCampo62());
            registroExistente.setCampo63(tablaExamen.getCampo63());
            registroExistente.setCampo64(tablaExamen.getCampo64());
            registroExistente.setCampo65(tablaExamen.getCampo65());
            registroExistente.setCampo66(tablaExamen.getCampo66());
            registroExistente.setCampo67(tablaExamen.getCampo67());
            registroExistente.setCampo68(tablaExamen.getCampo68());
            registroExistente.setCampo69(tablaExamen.getCampo69());
            registroExistente.setCampo70(tablaExamen.getCampo70());
            registroExistente.setCampo71(tablaExamen.getCampo71());
            registroExistente.setCampo72(tablaExamen.getCampo72());
            registroExistente.setCampo73(tablaExamen.getCampo73());
            registroExistente.setCampo74(tablaExamen.getCampo74());
            registroExistente.setCampo75(tablaExamen.getCampo75());
            registroExistente.setCampo76(tablaExamen.getCampo76());
            registroExistente.setCampo77(tablaExamen.getCampo77());
            registroExistente.setCampo78(tablaExamen.getCampo78());
            registroExistente.setCampo79(tablaExamen.getCampo79());
            registroExistente.setCampo80(tablaExamen.getCampo80());
            registroExistente.setCampo81(tablaExamen.getCampo81());
            registroExistente.setCampo82(tablaExamen.getCampo82());
            registroExistente.setCampo83(tablaExamen.getCampo83());
            registroExistente.setCampo84(tablaExamen.getCampo84());
            registroExistente.setCampo85(tablaExamen.getCampo85());
            registroExistente.setCampo86(tablaExamen.getCampo86());
            registroExistente.setCampo87(tablaExamen.getCampo87());
            registroExistente.setCampo88(tablaExamen.getCampo88());
            registroExistente.setCampo89(tablaExamen.getCampo89());
            registroExistente.setCampo90(tablaExamen.getCampo90());
            registroExistente.setCampo91(tablaExamen.getCampo91());
            registroExistente.setCampo92(tablaExamen.getCampo92());
            registroExistente.setCampo93(tablaExamen.getCampo93());
            registroExistente.setCampo94(tablaExamen.getCampo94());
            registroExistente.setCampo95(tablaExamen.getCampo95());
            registroExistente.setCampo96(tablaExamen.getCampo96());
            registroExistente.setCampo97(tablaExamen.getCampo97());
            registroExistente.setCampo98(tablaExamen.getCampo98());
            registroExistente.setCampo99(tablaExamen.getCampo99());
            registroExistente.setCampo100(tablaExamen.getCampo100());
            registroExistente.setCampo101(tablaExamen.getCampo101());
            registroExistente.setCampo102(tablaExamen.getCampo102());
            registroExistente.setCampo103(tablaExamen.getCampo103());
            registroExistente.setCampo104(tablaExamen.getCampo104());
            registroExistente.setCampo105(tablaExamen.getCampo105());
            registroExistente.setCampo106(tablaExamen.getCampo106());
            registroExistente.setCampo107(tablaExamen.getCampo107());
            registroExistente.setCampo108(tablaExamen.getCampo108());
            registroExistente.setCampo109(tablaExamen.getCampo109());
            registroExistente.setCampo110(tablaExamen.getCampo110());
            registroExistente.setCampo111(tablaExamen.getCampo111());
            registroExistente.setCampo112(tablaExamen.getCampo112());
            registroExistente.setCampo113(tablaExamen.getCampo113());
            registroExistente.setCampo114(tablaExamen.getCampo114());
            registroExistente.setCampo115(tablaExamen.getCampo115());
            registroExistente.setCampo116(tablaExamen.getCampo116());
            registroExistente.setCampo117(tablaExamen.getCampo117());
            registroExistente.setCampo118(tablaExamen.getCampo118());
            registroExistente.setCampo119(tablaExamen.getCampo119());
            registroExistente.setCampo120(tablaExamen.getCampo120());
            registroExistente.setCampo121(tablaExamen.getCampo121());
            registroExistente.setCampo122(tablaExamen.getCampo122());
            registroExistente.setCampo123(tablaExamen.getCampo123());
            registroExistente.setCampo124(tablaExamen.getCampo124());

            registroExistente.setTimestampColumn(new Timestamp(System.currentTimeMillis()));
            return tablaExamenRepository.save(registroExistente);
        } else {
            return null;
        }
    }
    public void eliminarRegistro(Integer id) {
        tablaExamenRepository.deleteById(id);
    }
    public List<TablaExamen> obtenerTodosLosRegistros() {
        return tablaExamenRepository.findAll();
    }
    public TablaExamen obtenerRegistroPorId(Integer id) {
        Optional<TablaExamen> optionalTablaExamen = tablaExamenRepository.findById(id);
        return optionalTablaExamen.orElse(null);
    }
    public List<TablaExamen> obtenerRegistrosPorPacienteId(Integer pacienteId) {
        return tablaExamenRepository.findByPacienteId(pacienteId);
    }
}
