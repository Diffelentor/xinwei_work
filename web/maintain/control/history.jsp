<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<script>
    var identity=sessionStorage.getItem("identity");
    if(identity === "管理员"){
        window.location.href="../historyAdministrator/historyAd.jsp";
    }else if(identity === "普通用户"){
        window.location.href="../historyCommon/historyCommon.jsp";
    }else {
        window.location.href="../../home/main/login.jsp";
    }
</script>