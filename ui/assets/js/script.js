function SetJob(job) {
    if (job.job.name == "nojob") {
        $(".player-job").css("opacity", "0");
    } else {
        $(".player-job").css("opacity", "1");
    }

    if (job.job.ext) {
        if (job.job.grade < 0) {
            $(".info-job-name span").text(job.job.ext.replace("_", " ").toUpperCase());
            $(".job-img img").attr("src", "./assets/imgs/jobs/" + job.job.ext + ".svg");
            $(".info-job-grade span").text("Off-Duty");
        } else {
            $(".info-job-name span").text(job.job.ext.replace("_", " ").toUpperCase());
            $(".job-img img").attr("src", "./assets/imgs/jobs/" + job.job.ext + ".svg");
            $(".info-job-grade span").text(job.job.grade_label);
        }
    } else {
        if (job.job.grade < 0) {
            $(".info-job-name span").text(job.job.label);
            $(".job-img img").attr("src", "./assets/imgs/jobs/" + job.job.name + ".svg");
            $(".info-job-grade span").text("Off-Duty");
        } else {
            $(".info-job-name span").text(job.job.label);
            $(".job-img img").attr("src", "./assets/imgs/jobs/" + job.job.name + ".svg");
            $(".info-job-grade span").text(job.job.grade_label);
        }
    }
}

function SeteventGang(gang) {
    if (gang.gang.name == "nogang") {
        $(".player-gang").css("opacity", "0");
    } else {
        $(".player-gang").css("opacity", "1");
    }
    $(".gang-img img").attr("src", "./assets/imgs/jobs/gang.svg");
    $(".info-gang-name span").text(gang.gang.name.replace("_", " "));

    $(".info-gang-grade span").text(gang.gang.grade_label);
}

function Setovdata(data) {
    if (data.health <= 20.0) {
        $(".health").css({ "background": "rgba(237, 49, 49, 0.8)" });
    } else if (data.health <= 70.0) {
        $(".health").css({ "background": "rgba(204, 146, 59, 0.8)" });
    } else {
        $(".health").css({ "background": "rgba(46, 138, 72, 0.8)" });
    }
    if (data.armor <= 20.0) {
        $(".armor").css({ "background": "rgba(237, 49, 49, 0.8)" });
    } else if (data.armor <= 70.0) {
        $(".armor").css({ "background": "rgba(204, 146, 59, 0.8)" });
    } else {
        $(".armor").css({ "background": "rgba(46, 138, 72, 0.8)" });
    }
    $(".health").css("width", data.health + "%");
    $(".armor").css("width", data.armor + "%");

    $(".health span").text(Math.ceil(data.health));
    $(".armor span").text(Math.ceil(data.armor));
}

function HUDStatus(data) {
    let hunger = data[0].percent;
    let thirst = data[1].percent;
    if (hunger <= 20.0) {
        $(".hunger").css({ "background": "rgba(237, 49, 49, 0.8)" });
    } else if (hunger <= 70.0) {
        $(".hunger").css({ "background": "rgba(204, 146, 59, 0.8)" });
    } else {
        $(".hunger").css({ "background": "rgba(46, 138, 72, 0.8)" });
    }

    if (thirst <= 20.0) {
        $(".thirst").css({ "background": "rgba(237, 49, 49, 0.8)" });
    } else if (thirst <= 70.0) {
        $(".thirst").css({ "background": "rgba(204, 146, 59, 0.8)" });
    } else {
        $(".thirst").css({ "background": "rgba(46, 138, 72, 0.8)" });
    }

    $(".hunger").css("width", hunger + "%");
    $(".thirst").css("width", thirst + "%");

    $(".hunger span").text(Math.ceil(hunger));

    $(".thirst span").text(Math.ceil(thirst));



}

function SetToggleStatus(status) {
    if (status === true) {
        $(".player-other-info").css("display", "flex");
        $(".player-other-info2").css("display", "block");
        $(".progress-bars").css("height", "105%");
    } else {
        $(".player-other-info").css("display", "none");
        $(".player-other-info2").css("display", "none");
        $(".progress-bars").css("height", "9vw");
    }
}

window.addEventListener("message", (event) => {
    var data = event.data
    if (data.HUDToggle === true) {
        SetToggleStatus(data.hudToggleStatus)
    } else if (data.SetHudOpacity === true) {
        $("#container").css("opacity", data.opacityHUD)

    } else if (data.PlayerNamee === true) {

        $(".player-name span").html(data.Pname)

    } else if (data.IDHUD === true) {

        $(".player-id span").html(data.idplayer)

    } else if (data.SeteventGang === true) {

        SeteventGang(data.Gdata)

    } else if (data.SetJob === true) {

        SetJob(data.Jdata)

    } else if (data.Setovdata === true) {

        Setovdata(data.ovdata)

    } else if (data.SetPCash === true) {

        $(".cash-count span").html(data.cash)

    } else if (data.SetPBank === true) {

        $(".bank-count span").html(data.bank)

    } else if (data.HUDStatus === true) {

        HUDStatus(data.statusdata)

    } else if (data.offstatus === true) {

        $("#container").css("display", 'none')

    }else if (data.onstatus === true) {

        $("#container").css("display", 'flex')

    }

});