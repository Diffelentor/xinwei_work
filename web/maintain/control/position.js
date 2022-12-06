var identity=sessionStorage.getItem("identity");
if(identity === "管理员"){
    window.location.href="../myPositionAdministrator/myPositionAdministrator.jsp";
}else if(identity === "普通用户"){
    window.location.href="../myPosition/myPosition.jsp";
}else {
    window.location.href="../../home/main/login.jsp";
}
