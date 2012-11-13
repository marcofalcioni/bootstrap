$(function() {

/*
    // change the title of the window
    var tititem = document.getElementsByName('title');
    var genitem = document.getElementsByName('genomeId');
    var title = document.title;
    if(tititem.length == 1) {
        document.title = title + " - " + $(tititem).val();
    } else if(genitem.length == 1) {
        document.title = title + " - " + $(genitem).val();
    }

    // create event to show popup help window
    $('[id=help]').hover(function(event) {
        var $this = $(this);
        setTimeout(function(){
            showPopup($this, $this.attr('alt'), null);},500);
    }, function() {
        $(this).find('[id=popup_block]').hide();
    });

    // create event to show popup evidence window
    $('.flexigrid tr[id*="row"]').live('mouseenter', function(event){
        showPopup(this, $(this).attr('id'), event);
    }).live('mouseleave', function(){
        $(this).find('[id=popup_block]').hide();
    });

    // create event to show popup evidence window
    $('[id=evidence]').hover(function(event) {
        showPopup($(this), $(this).attr('alt'), null);
    }, function() {
        $(this).find('[id=popup_block]').hide();
    });


    // creates upload dialog
    $("#uploadDialog").dialog({
        autoOpen: false,
        modal: true,
        width: '500px',
        buttons: {
            "Upload File": function() {
                $('[name=gvfupload]').submit();
            },
            Close: function() {
                $(this).dialog("close");
                window.location.reload();
            }
        }
    });

    // PV: creates upload dialog
    function showUploadDialog() {
        $('#uploadDialog').dialog({
            open: function (ev, ui) {
                $('#result').html('');
                $('#f_labelError').html('');
                $('#g_labelError').html('');
                $('#result').attr({'class':'showAtTop'});
                //reset the form first for fresh upload
                $('#gvfupload_form')[0].reset();
                document.getElementById('gvfupload_form').style.visibility = 'visible';
                $('[class="ui-dialog-title"]').text('Variant File Upload');
            },
            title: 'Variant File Upload',
            autoOpen: true,
            modal: true,
            width: 450,
            height: 'auto',
            resizable: false,
            stack: true,
            position: 'center',
            close: function(ev, ui) {
                //return false;
                //alert('closed');
                //$(this).dialog("close");
                $(this).hide();
                //window.location.reload();
            }
        });
    }
*/
    // create event to show popup help window
    if($("#help")) {
        $("#help").hover(function(event) {
            showPopup($(this), $(this).attr('alt'), null);
        }, function() {
            $(this).find('[id=popup_block]').hide();
        });
    }

    // handle evidence dialog events
    $("img.evidence").live("click", function(event) {
        var $this = $(this);
        var $dialog = $("#evidence_dialog");
        if($dialog !== undefined) {
            $dialog.dialog('close');
            $dialog.remove();
        }
        create_and_open_dialog_for($this);
    });

    $("#flexFilter").change(updateInterpretList);

    // PV: file upload button event
    $("#uploadBtn").button({
        label: 'Upload Genome'
    }).click(function() {
        // $("#uploadDialog strong").text("");
        // $("#uploadDialog").dialog('open');
        showUploadDialog();
    });

    // PV: upload dialog handler
    $('#uploadGenomeBtn').click(function() {
        var filepath =$('#fileInput').val();
        var fileName = filepath.replace(/.*(\/|\\)/, "");
        var extension = fileName.substr( (fileName.lastIndexOf('.') +1) );
        if ($('#fileInput').val()=="") {
            $('#f_labelError').text('Please select a file');
            if ($.trim($('#genomeLabel').val())=="") {
                $('#g_labelError').text('Please enter Genome Label');
                $('#genomeLabel').val('');
            } else {
                $('#g_labelError').text('');
            }
        } else if ($.inArray(extension, ['gvf','vcf','zip','gz', 'bz2']) == -1) {
            $('#f_labelError').html('Only files with extension(s) .gvf .vcf .zip .gz and .bz2  are allowed.');
            if ($.trim($('#genomeLabel').val())=="") {
                $('#g_labelError').text('Please enter Genome Label');
                $('#genomeLabel').val('');
            } else {
                $('#g_labelError').text('');
            }
        } else if ($.trim($('#genomeLabel').val())=="") {
            $('#g_labelError').text('Please enter Genome Label');
            $('#genomeLabel').val('');
            if ($('#fileInput').val()=="") {
                $('#f_labelError').text('Please select a file');
            } else {
                $('#f_labelError').text('');
            }
        } else {
            //alert('submitted');
            $('#g_labelError').html('');
            $('#f_labelError').html('');
            $('[name=gvfupload]').submit();
            // var action = $('[name=gvfupload]').attr('action');
            //  myFormUploadAjaxFunction(action);
        }
    });

    // PV: creates interpret button
    $("#reportingBtn").button({
        label: 'Interpret'
    }).click(function() {
        showInterpretDialog();
        // showTrioAnalysisDialog();
    });

    // PV: creates vaast trio button
    $("#VAASTTrioBtn").button({
        label: 'Tvaast'
    }).click(function() {
        showVAASTDialog(1);
    });
    // PV: creates vaast quad button
    $("#VAASTQuadBtn").button({
        label: 'Qvaast'
    }).click(function() {
        showVAASTDialog(2);
    });

    // PV: creates genome operations button
    $("#operationsBtn").button({
    // label: 'Genome Operations'
    }).click(function() {
        alert("This capability is not implemented in this release.");
    });

    // PV: creates manage sets button
    $("#setsBtn").button({
    // label: 'Manage Sets'
    }).click(function() {
        showManageSetDialog();
    });

    // PV: creates manage projects button
    $("#projectsBtn").button({
    // label: 'Manage Projects'
    }).click(function() {
        showManageProjectDialog();
    });

    // VV: create variant miner button
    $("[name=variantMinerBtn]").button({
    // label: 'Variant Miner'
    }).click(function() {
        showVariantMiner();
    });

    // VV: create variant load button
    $("[name=varLoadBtn]").button({
    // label: 'Variant Load'
    }).click(function() {
        showDialog('img', $(this).attr('href'), 'Variant Load Graph');
    });

    // VV: create manage filter button
    $("[name=filterBtn]").button({
        label: 'Manage Filters'
    }).click(function() {showManageFilterView();});

    // VV: create variant load button
    $("[name=varLoadBtn2]").button({
        label: 'Variant Load'
    }).click(function() {showVariantLoad();});

    // VV: create set operations button
    $("[name=setOpsBtn]").button({
        label: 'Set Operations'
    }).click(function() {showSetOpsView();});

    // VV: create export button
    $("[name=exportBtn]").button({
        label: 'CSV Export'
    }).click(function() {exportToExcel();});

    // VV: create version button
    $("[name=versionBtn]").button({
       // label: 'Version'
    }).click(function() {showVersionHistory();});

        // VV: go back button
    $("[name=gobackBtn]").button({
       // label: 'Go Back'
    }).click(function() {history.back();});

    // VV: variant view filter options
    // search box event
    $("[name=searchBox]").keydown(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            searchGenome();
        }
    });

    // VV: gene search box event
    $("[name=geneSearchBox]").keydown(function(event) {
        if (event.keyCode == 13 || event.keyCode == 9) {
            event.preventDefault();
            validateGeneSymbols();
        }
    });

    // VV: gene search button event
    $("[id=geneSearchBtn]").click(function() {
        validateGeneSymbols()
    });

    // VV: refresh button event
    $("[id=refreshBtn]").click(function() {
        clearFilterSettings();
    });

    // IV: report type radio buttons
    $("#interpretmode").buttonset();
    $("#interpretmode").change(function(event) {
        var mode = $("input[name='mode']:checked").val();
        if (mode != "" && mode != null) {
            $("input[id=interpretmode]").val(mode);
            return updateInterpretList(event);
        }
        return false;
    });

    // IV: save the report
    $("[name=repSaveBtn]").button({
    // label: 'Save Report'
    }).click(function() {
        alert("Save is not implemented in this release.");
    });

    // IV: export to excel
    $("[name=repExportBtn]").button({
     label: 'CSV Export'
    }).click(function() {
        alert("Export is not implemented in this release.");
    });

    // VAAST Trio: variant miner
    $("[name=vaastMiningBtn]").button({
    // label: 'Variant Miner'
    }).click(function() {
        showVaastVariantMiner();
    });

    // VAAST Trio: filter the report
    $("[name=vaastFilterBtn]").button({
    // label: 'Filter Report'
    }).click(function() {
        var vaastFilterStickyDialog = undefined;
        // show vaast filter dialog
        return function showVaastFilterDialog() {
            var dtitle = "VAAST Filter";
            var link = "index.php?id=65";
            if(vaastFilterStickyDialog==undefined) {
                var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
                    .load(link)
                        .dialog({
                            autoOpen: false,
                            title: dtitle,
                            width: 'auto',
                            height: 'auto',
                            resizable: false,
                            modal: true,
                            stack: true,
                            position: 'center',
                            //close: function(ev, ui) { $(this).remove();}
                        });
                vaastFilterStickyDialog = dialog;
            }
            vaastFilterStickyDialog.dialog('open');
        };
    }()); // Note that the wrapper is executed here.

    // VAAST Trio: export to excel
    $("[name=vaastExportTrioBtn]").button({
     label: 'CSV Export'
    }).click(function() {
        exportVaastTrioToExcel();
    });

    // VAAST Quad: export to excel
    $("[name=vaastExportQuadBtn]").button({
     label: 'CSV Export'
    }).click(function() {
        exportVaastQuadToExcel();
    });

    // VAAST: vast viewer
    $("[name=vaastViewerBtn]").button({
    // label: 'VAAST Viewer'
    }).click(function() {
        showVAASTViewer();
    });

    // setup coverage filter event
    var cmin = $("#coverageVals #min").html();
    var cmax = $("#coverageVals #max").html();
    var disabled = false;
    if(cmin =="" || cmax == "" ) {
        cmin = 0;
        cmax = 0;
        disabled = true;
    } else {
        cmin = parseInt(cmin);
        cmax = parseInt(cmax);
    }
    $("#coverageSlider").slider({
        range: true,
        min: cmin,
        max: cmax,
        step: 1,
        values: [cmin, cmax],
        slide: function(event, ui) {
            $('#coverageVals #min').html(ui.values[0]);
            $('#coverageVals #max').html(ui.values[1]);
        },
        stop: function() {
            updateList();
        }
    });
    if(disabled) {
        $("#coverageSlider").attr('id', 'coverageSlider disabled');
    }

    // setup omicia score filter event
    var omin = $("#omiscoreVals #min").html();
    var omax = $("#omiscoreVals #max").html();
    var disabled = false;
    if(omin == "" || omax == "" ) {
        omin = 0;
        omax = 0;
        disabled = true;
    } else {
        omin = parseInt(omin);
        omax = parseInt(omax);
    }
    $("#omiscoreSlider").slider({
        range: true,
        min: omin,
        max: omax,
        step: 0.05,
        values: [omin, omax],
        slide: function(event, ui) {
            $('#omiscoreVals #min').html((ui.values[0]).toFixed(2));
            $('#omiscoreVals #max').html((ui.values[1]).toFixed(2));
        },
        stop: function() {
            updateList();
        }
    });
    if(disabled) {
        $("#omiscoreSlider").slider({disable:true});
    }

    // setup quality filter event
    var qmin = $("#qualityVals #min").html();
    var qmax = $("#qualityVals #max").html();
    var disabled = false;
    if(qmin == "" || qmax == "" ) {
        qmin = 0;
        qmax = 0;
        disabled = true;
    } else {
        qmin = parseInt(qmin);
        qmax = parseInt(qmax);
    }
    $("#qualitySlider").slider({
        range: true,
        min: qmin,
        max: qmax,
        step: 1,
        values: [qmin, qmax],
        slide: function(event, ui) {
            $('#qualityVals #min').html(ui.values[0]);
            $('#qualityVals #max').html(ui.values[1]);
        },
        stop: function() {
            updateList();
        }
    });
    if(disabled) {
        $("#qualitySlider").attr('id', 'qualitySlider disabled');
    }

    // setup frequency filter event
    $("#frequencySlider").slider({
        range: true,
        min: 0,
        max: 1,
        step: 0.01,
        values: [0, 1],
        slide: function(event, ui) {
            if(ui.values[0] > 0) {
                $('#frequencyVals #min').html((ui.values[0] * 100).toFixed(2));
            } else {
                $('#frequencyVals #min').html((ui.values[0] * 100));
            }
            if(ui.values[1] < 1) {
                $('#frequencyVals #max').html((ui.values[1] * 100).toFixed(2));
            } else {
                $('#frequencyVals #max').html((ui.values[1] * 100));
            }
        },
        stop: function(event, ui) {
            updateList();
        }
    });

    // setup sift filter event
    $("#siftSlider").slider({
        range: true,
        min: 0,
        max: 1,
        step: 0.01,
        values: [0, 1],
        slide: function(event, ui) {
            $('#siftVals #min').html((ui.values[0]).toFixed(2));
            $('#siftVals #max').html((ui.values[1]).toFixed(2));
        },
        stop: function() {
            updateList();
        }
    });

    // setup check box events
    $('[name="hetzygosity"]').click(function() {
        handleHetZygCheck();
    });
    $('[name="zygosity"]').click(function() {
        handleHomZygCheck();
    });
    $('[name=consequence]').click(function() {
        handleConsequenceAllCheck();
    });
    $('[name="mutationtype[]"]').change(function() {
        handleConsequenceCheck();
    });
    $('[name="dbsnp"]').click(function() {
        updateList();
    });
    $('[name="intronic"]').click(function() {
        updateList();
    });
    $('[name="intergenic"]').click(function() {
        updateList();
    });
    $('[name="nocall"]').click(function() {
        updateList();
    });
    $('[name="noncoding"]').click(function() {
        updateList();
    });
    $('[name="polyphenD"]').click(function() {
        updateList();
    });
    $('[name="polyphenP"]').click(function() {
        updateList();
    });
    $('[name="omimhits"]').click(function() {
        handleOmimHitsCheck();
    });
    $('[name="allhits"]').click(function() {
        handleAllHitsCheck();
    });
    $('[name="stronghits"]').click(function() {
        handleStrongHitsCheck();
    });
    $('[name="ccds"]').click(function() {
        handleCCDSCheck();
    });
    $('[name="refseq"]').click(function() {
        handleRefSeqCheck();
    });
    $('[name="polymorph"]').click(function() {
        handlePolymorphAllCheck();
    });
    $('[name="znf"]').click(function() {
        handlePolymorphCheck();
    });
    $('[name="or"]').click(function() {
        handlePolymorphCheck();
    });
    $('[name="sno"]').click(function() {
        handlePolymorphCheck();
    });
    $('[name="tcr"]').click(function() {
        handlePolymorphCheck();
    });
    $('[name="hla"]').click(function() {
        handlePolymorphCheck();
    });
    $('[name="muc"]').click(function() {
        handlePolymorphCheck();
    });

    $('[name="sort"]').click(function() {
        handleSortCheck();
    });

    updateVals('coverage', $("#coverageSlider"));
    updateVals('quality', $("#qualitySlider"));
    updateVals('frequency', $("#frequencySlider"));
    updateVals('sift', $("#siftSlider"));
    updateVals('omiscore', $("#omiscoreSlider"));

    $('[name=harCat]').bind("click", harCatClick);
    $('[name=harCat]').hover(function(event) {
        showPopup($('.main'), $(this).attr('alt'), event);
    }, function() {
        $('.main').find('[id=popup_block]').hide();
    });

    // setup disease set event
    $('[name=disease]').bind("click", geneSetClick);
    $('[name=disease]').hover(function(event) {
        var html = "<span style=\"font-size: 9pt;\"></span>" + $(this).attr('desc');
        html = html.replace(/\,/g, ", ");
        showPopup($('.main'), html, event);
    }, function() {
        $('.main').find('[id=popup_block]').hide();
    });

    // setup drug set event
    $('[name=drug]').bind("click", drugSetClick);
    $('[name=drug]').hover(function(event) {
        var html = "<span style=\"font-size: 9pt;\"></span>" + $(this).attr('desc');
        // var html = $(this).attr('desc');
        html = html.replace(/\,/g, ", ");
        // showPopup($('.content'), html, event);
        showPopup($('.main'), html, event);
    }, function() {
        // $('.content').find('[id=popup_block]').hide();
        $('.main').find('[id=popup_block]').hide();
    });

    // setup pathway set event
    $('[name=pathway]').bind("click", pathwaySetClick);
    $('[name=pathway]').hover(function(event) {
        var html = "<span style=\"font-size: 9pt;\"></span>" + $(this).attr('desc');
        html = html.replace(/\,/g, ", ");
        showPopup($('.main'), html, event);
    }, function() {
        $('.main').find('[id=popup_block]').hide();
    });

    // setup myset event
    $('[name=myset]').bind("click", mygeneSetClick);
    $('[name=myset]').hover(function(event) {
        var html = "<span style=\"font-size: 9pt;\"></span>" + $(this).attr('desc');
        html = html.replace(/\,/g, ", ");
        showPopup($('.main'), html, event);
    }, function() {
        $('.main').find('[id=popup_block]').hide();
    });

    $('[name=chroms]').bind("click", chromClick);

    $('[name=filter]').bind("click", filterSettingsClick);
    $('[name=filter]').hover(function(event) {
        showPopup($('.main'), $(this).attr('alt'), event);
    }, function() {
        $('.main').find('[id=popup_block]').hide();
    });

    // PV: project view filter options
    // setup project list navigation events
    $('[name=projectname]').bind("click", projClick);
    $('[name=projectname]').hover(function(event) {
        showPopup($('.main'), $(this).attr('alt'), event);
    }, function() {
        $('.main').find('[id=popup_block]').hide();
    });

    // VV: setup variant view accordions
    $(".geneSearchDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true
    }).accordion('activate', 0);

    $(".diseaseCatDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true
    });

    $(".geneSetDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true
    });

    $(".drugDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true
    });

    $(".pathwayDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true,
    });

    $(".myGeneSetDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true
    });

    $(".expressionDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true,
        disabled: true
    });

    $(".chromDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true
    });

    $(".savedFilterDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true
    });

    $(".copynumDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true,
        disabled: true
    });

    $(".showOnlyDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true
    });

    $(".filterByDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true
    });

    $(".excludeDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true
    })

    $(".sortDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true
    })

    // PV: setup project view accordions
    $(".genomeSearchDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true,
        disabled: true
    });

    $(".smartFolderDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true,
        disabled: true
    });

    $(".projectListDiv").accordion({
        active: false,
        clearStyle: true,
        collapsible: true
    }).accordion('activate', 0);

    // PV: project grid
    if (document.getElementById('projectGrid')) {
        $('#projectGrid').flexigrid ({
            url: '/test/index.php?id=22',
            dataType: 'json',
            colModel : [
                {display: 'Genome', name: 'genomeId', width: '60', sortable: false, align: 'left', nowrap: false},
                {display: 'Label', name: 'name', width: '290', sortable: false, align: 'left', nowrap: false},
                {display: 'Clinical<br />Grade', name: 'grade', width: '50', sortable: false, align: 'center', nowrap: false},
                {display: 'Upload Date', name: 'udate', width: '80', sortable: false, align: 'left', nowrap: false},
                {display: 'Report Type', name: 'rtype', width: '180', sortable: false, align: 'left', nowrap: false},
                {display: 'Report Date', name: 'rdate', width: '80', sortable: false, align: 'left', nowrap: false},
                {display: 'Version', name: 'rversion', width: '80', sortable: false, align: 'left', nowrap: false},
                {display: 'Status', name: 'rstatus', width: '80', sortable: false, align: 'left', nowrap: false}
            ],
            sortname: "genomeId",
            sortorder: "ASC",
            usepager: false,
            title: '',
            procmsg: '<div style=\"font-size: 10pt;\">Processing, please wait ...</div>',
            nomsg: function() {return '<div style=\"font-size: 10pt; color: red; font-weight: bold;\">No items</div>';},
            useRp: true,
            rp: 100,
            query: getProjValues(),
            rpOptions: [10, 50, 100, 200,250],
            showTableToggleBtn: true,
            onError: function(data) {alert(data.responseText);},
            onSuccess: function() {gridFormat();},
            height: getHeight()
        });
    }

    // VV: variant miner grid v1.0 pipeline
    if (document.getElementById('variantReportOld')) {
        $('#variantReportOld').flexigrid ({
            url: '/test/index.php?id=12',
            dataType: 'json',
            colModel : [
                {display: 'Gene', name: 'gene', width: '60', sortable: false, align: 'left', nowrap: false},
                {display: 'Position', name: 'position', width: '65', sortable: false, align: 'center', nowrap: false},
                {display: 'dbSNP', name: 'rsId', width: '64', sortable: false, align: 'left', nowrap: false},
                {display: 'Change', name: 'change', width: '90', sortable: false, align: 'center', nowrap: false},
                {display: 'Zygosity', name: 'zygosity', width: '79', sortable: false, align: 'left', nowrap: false},
                {display: 'Effect', name: 'consequence', width: '74', sortable: false, align: 'left', nowrap: false},
                {display: 'Quality<br />Coverage', name: 'quality', width: '65', sortable: false, align: 'center', nowrap: false},
                {display: 'Frequency', name: 'frequency', width: '60', sortable: false, align: 'center', nowrap: false},
                {display: 'SIFT', name: 'sift', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Evidence', name: 'evidence', width: '267', sortable: false, align: 'left', nowrap: false}
            ],
            sortname: "position",
            sortorder: "ASC",
            nowrap: false,
            usepager: true,
            title: '',
            procmsg: '<div style=\"font-size: 10pt;\">Processing, please wait ...</div>',
            nomsg: function() {enableFilters();return '<div style=\"font-size: 10pt; color: red; font-weight: bold;\">No items</div>';},
            useRp: true,
            rp: 100,
            query: getValues(),
            rpOptions: [10, 50, 100, 200, 250],
            showTableToggleBtn: true,
            onError: function(data) {enableFilters();alert(data.responseText);},
            onSuccess: function() {enableFilters();},
            height: getHeight()
        });
    }

    // VV: variant miner grid v2.0 pipeline
    if (document.getElementById('variantReport2')) {
        $('#variantReport2').flexigrid ({
            url: '/test/index.php?id=12',
            dataType: 'json',
            colModel : [
                {display: 'Gene', name: 'gene', width: '75', sortable: false, align: 'left', nowrap: false},
                {display: 'Position<br />dbSNP', name: 'position', width: '80', sortable: false, align: 'center', nowrap: false},
                {display: 'Change', name: 'change', width: '110', sortable: false, align: 'center', nowrap: false},
                {display: 'Zygosity', name: 'zygosity', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Effect', name: 'effect', width: '70', sortable: false, align: 'left', nowrap: false},
                {display: 'Quality<br />Coverage', name: 'quality', width: '65', sortable: false, align: 'center', nowrap: false},
                {display: 'Frequency', name: 'frequency', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Omicia<br />Score', name: 'polyphen', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Polyphen<br />Mut-Taster', name: 'polyphen', width: '57', sortable: false, align: 'center', nowrap: false},
                {display: 'SIFT<br />PhyloP', name: 'sift', width: '50', sortable: false, align: 'center', nowrap: false},
                {display: 'Evidence', name: 'evidence', width: '175', sortable: false, align: 'left', nowrap: false}
            ],
            sortname: "position",
            sortorder: "ASC",
            usepager: true,
            nowrap: false,
            title: '',
            procmsg: '<div style=\"font-size: 10pt;\">Processing, please wait ...</div>',
            nomsg: function() {enableFilters();return '<div style=\"font-size: 10pt; color: red; font-weight: bold;\">No items</div>';},
            useRp: true,
            rp: 100,
            query: getValues(),
            rpOptions: [10, 50, 100, 200, 250],
            showTableToggleBtn: true,
            onError: function(data) {enableFilters();alert(data.responseText);},
            onSuccess: function() {enableFilters();},
            height: getHeight()
        });
    }

    // VR: variant report grid v2.0 pipeline
    if (document.getElementById('variantReport')) {
        $('#variantReport').flexigrid ({
            url: '/test/index.php?id=12',
            dataType: 'json',
            colModel : [
                {display: 'Variant<br />Class', name: 'class', width: '90', sortable: false, align: 'left', nowrap: false},
                {display: 'Gene', name: 'gene', width: '75', sortable: false, align: 'left', nowrap: false},
                {display: 'Position<br />dbSNP', name: 'position', width: '80', sortable: false, align: 'center', nowrap: false},
                {display: 'Change', name: 'change', width: '110', sortable: false, align: 'center', nowrap: false},
                {display: 'Zygosity', name: 'zygosity', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Effect', name: 'effect', width: '70', sortable: false, align: 'left', nowrap: false},
                {display: 'Quality<br />Coverage', name: 'quality', width: '65', sortable: false, align: 'center', nowrap: false},
                {display: 'Frequency', name: 'frequency', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Omicia<br />Score', name: 'polyphen', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Polyphen<br />Mut-Taster', name: 'polyphen', width: '57', sortable: false, align: 'center', nowrap: false},
                {display: 'SIFT<br />PhyloP', name: 'sift', width: '50', sortable: false, align: 'center', nowrap: false},
                {display: 'Evidence', name: 'evidence', width: '280', sortable: false, align: 'left', nowrap: false}
            ],
            sortname: "position",
            sortorder: "ASC",
            usepager: true,
            nowrap: false,
            title: '',
            procmsg: '<div style=\"font-size: 10pt;\">Processing, please wait ...</div>',
            nomsg: function() {enableFilters();return '<div style=\"font-size: 10pt; color: red; font-weight: bold;\">No items</div>';},
            useRp: true,
            rp: 100,
            query: getVRValues(),
            rpOptions: [10, 50, 100, 200, 250],
            showTableToggleBtn: true,
            onError: function(data) {enableFilters();alert(data.responseText);},
            onSuccess: function() {enableFilters();},
            height: getVRHeight()
        });
    }

    // VV: variant miner grid v2.0 pipeline
    if (document.getElementById('variantMiner')) {
        $('#variantMiner').flexigrid ({
            url: '/test/index.php?id=12',
            dataType: 'json',
            colModel : [
                {display: 'Gene', name: 'gene', width: '75', sortable: false, align: 'left', nowrap: false},
                {display: 'Position<br />dbSNP', name: 'position', width: '80', sortable: false, align: 'center', nowrap: false},
                {display: 'Change', name: 'change', width: '110', sortable: false, align: 'center', nowrap: false},
                {display: 'Zygosity', name: 'zygosity', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Effect', name: 'effect', width: '70', sortable: false, align: 'left', nowrap: false},
                {display: 'Quality<br />Coverage', name: 'quality', width: '65', sortable: false, align: 'center', nowrap: false},
                {display: 'Frequency', name: 'frequency', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Omicia<br />Score', name: 'polyphen', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Polyphen<br />Mut-Taster', name: 'polyphen', width: '57', sortable: false, align: 'center', nowrap: false},
                {display: 'SIFT<br />PhyloP', name: 'sift', width: '50', sortable: false, align: 'center', nowrap: false},
                {display: 'Evidence', name: 'evidence', width: '180', sortable: false, align: 'left', nowrap: false}
            ],
            sortname: "position",
            sortorder: "ASC",
            usepager: true,
            nowrap: false,
            title: '',
            procmsg: '<div style=\"font-size: 10pt;\">Processing, please wait ...</div>',
            nomsg: function() {enableFilters();return '<div style=\"font-size: 10pt; color: red; font-weight: bold;\">No items</div>';},
            useRp: true,
            rp: 100,
            query: getValues(),
            rpOptions: [10, 50, 100, 200, 250],
            showTableToggleBtn: true,
            onError: function(data) {enableFilters();alert(data.responseText);},
            onSuccess: function() {enableFilters();},
            height: getHeight()
        });
    }

    // IV: flex trio grid
    if (document.getElementById('flexTrioGrid')) {
        $('#flexTrioGrid').flexigrid ({
            url: '/test/index.php?id=40',
            dataType: 'json',
            colModel: [
                {display: 'Variant<br />Class', name: 'class', width: '90', sortable: false, align: 'left', nowrap: false},
                {display: 'Gene', name: 'gene', width: '60', sortable: false, align: 'left', nowrap: false},
                {display: 'Position<br />dbSNP', name: 'position', width: '70', sortable: false, align: 'center', nowrap: false},
                {display: 'Change', name: 'change', width: '100', sortable: false, align: 'center', nowrap: false},
                {display: 'Proband<br />Zygosity', name: 'zygosity', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Father<br />Zygosity', name: 'zygdad', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Mother<br />Zygosity', name: 'zygmom', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Effect', name: 'effect', width: '74', sortable: false, align: 'left', nowrap: false},
                {display: 'Global<br />MAF', name: 'frequency', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Omicia<br />Score', name: 'omicia', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Polyphen', name: 'polyphen', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Mutation-<br />Taster', name: 'mut', width: '60', sortable: false, align: 'center', nowrap: false},
                {display: 'SIFT<br />PhyloP', name: 'sift', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Evidence', name: 'evidence', width: '180', sortable: false, align: 'left', nowrap: false}
            ],
            buttons: [
             {name: 'Note', bclass: 'edit', onpress : comeBackLater},
             {name: 'Hide', bclass: 'delete', onpress : comeBackLater},
             {separator: true}
         ],
            sortname: "position",
            sortorder: "ASC",
            usepager: true,
            nowrap: false,
            title: '',
            procmsg: '<div style=\"font-size: 10pt;\">Processing, please wait ...</div>',
            nomsg: function() {enableFilters();return '<div style=\"font-size: 10pt; color: red; font-weight: bold;\">No items</div>';},
            useRp: false,
            rp: 10000,
            query: getFlexTrioValues(),
            showTableToggleBtn: true,
            onError: function(data) {enableFilters();alert(data.responseText);},
            onSuccess: function() {enableFilters();},
            height: getInterpretHeight()
        });
    }

    // IV: flex quad grid
    if (document.getElementById('flexQuadGrid')) {
        $('#flexQuadGrid').flexigrid ({
            url: '/test/index.php?id=64',
            dataType: 'json',
            colModel: [
                {display: 'Variant<br />Class', name: 'class', width: '90', sortable: false, align: 'left', nowrap: false},
                {display: 'Gene', name: 'gene', width: '60', sortable: false, align: 'left', nowrap: false},
                {display: 'Position<br />dbSNP', name: 'position', width: '70', sortable: false, align: 'center', nowrap: false},
                {display: 'Change', name: 'change', width: '90', sortable: false, align: 'center', nowrap: false},
                {display: 'Proband<br />Zygosity', name: 'zygosity', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Sibling<br />Zygosity', name: 'zygsib', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Father<br />Zygosity', name: 'zygdad', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Mother<br />Zygosity', name: 'zygmom', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Effect', name: 'effect', width: '74', sortable: false, align: 'left', nowrap: false},
                {display: 'Global<br />MAF', name: 'frequency', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Omicia<br />Score', name: 'omicia', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Polyphen', name: 'polyphen', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Mutation-<br />Taster', name: 'mut', width: '60', sortable: false, align: 'center', nowrap: false},
                {display: 'SIFT<br />PhyloP', name: 'sift', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Evidence', name: 'evidence', width: '130', sortable: false, align: 'left', nowrap: false}
            ],
            buttons: [
             {name: 'Note', bclass: 'edit', onpress : comeBackLater},
             {name: 'Hide', bclass: 'delete', onpress : comeBackLater},
             {separator: true}
         ],
            sortname: "position",
            sortorder: "ASC",
            usepager: true,
            nowrap: false,
            title: '',
            procmsg: '<div style=\"font-size: 10pt;\">Processing, please wait ...</div>',
            nomsg: function() {enableFilters();return '<div style=\"font-size: 10pt; color: red; font-weight: bold;\">No items</div>';},
            useRp: false,
            rp: 10000,
            query: getFlexQuadValues(),
            showTableToggleBtn: true,
            onError: function(data) {enableFilters();alert(data.responseText);},
            onSuccess: function() {enableFilters();},
            height: getInterpretHeight()
        });
    }

 // IV: vaast solo grid
    if (document.getElementById('vaastSoloReport')) {
        $('#vaastSoloReport').flexigrid ({
            url: '/test/index.php?id=74',
            dataType: 'json',
            colModel: [
                {display: 'Variant<br />Class', name: 'class', width: '90', sortable: false, align: 'left', nowrap: false},
                {display: 'Gene', name: 'gene', width: '80', sortable: false, align: 'left', nowrap: false},
                {display: 'Position<br />dbSNP', name: 'position', width: '85', sortable: false, align: 'center', nowrap: false},
                {display: 'Change', name: 'change', width: '120', sortable: false, align: 'center', nowrap: false},
                {display: 'Proband<br />Zygosity', name: 'zygosity', width: '55', sortable: false, align: 'left', nowrap: false},
                {display: 'Effect', name: 'effect', width: '80', sortable: false, align: 'left', nowrap: false},
                {display: 'Global<br />MAF', name: 'frequency', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Omicia<br />Score', name: 'omicia', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'V-Score', name: 'vscore', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'G-Score', name: 'gscore', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'Evidence', name: 'evidence', width: '298', sortable: false, align: 'left', nowrap: false}
            ],
            buttons: [
             {name: 'Note', bclass: 'edit', onpress : comeBackLater},
             {name: 'Hide', bclass: 'delete', onpress : comeBackLater},
             {separator: true}
         ],
            sortname: "position",
            sortorder: "ASC",
            usepager: true,
            nowrap: false,
            title: '',
            procmsg: '<div style=\"font-size: 10pt;\">Processing, please wait ...</div>',
            nomsg: function() {enableFilters();return '<div style=\"font-size: 10pt; color: red; font-weight: bold;\">No items</div>';},
            useRp: false,
            rp: 10000,
            query: getVaastSoloValues(),
            showTableToggleBtn: true,
            onError: function(data) {enableFilters();alert(data.responseText);},
            onSuccess: function() {enableFilters();},
            height: getInterpretHeight()
        });
    }

    // IV: vaast duo grid
    if (document.getElementById('vaastDuoReport')) {
        $('#vaastDuoReport').flexigrid ({
            url: '/test/index.php?id=71',
            dataType: 'json',
            colModel: [
                {display: 'Variant<br />Class', name: 'class', width: '90', sortable: false, align: 'left', nowrap: false},
                {display: 'Gene', name: 'gene', width: '80', sortable: false, align: 'left', nowrap: false},
                {display: 'Position<br />dbSNP', name: 'position', width: '85', sortable: false, align: 'center', nowrap: false},
                {display: 'Change', name: 'change', width: '120', sortable: false, align: 'center', nowrap: false},
                {display: 'Proband<br />Zygosity', name: 'zygosity', width: '55', sortable: false, align: 'left', nowrap: false},
                {display: 'Parent<br />Zygosity', name: 'zygparent', width: '55', sortable: false, align: 'left', nowrap: false},
                {display: 'Effect', name: 'effect', width: '80', sortable: false, align: 'left', nowrap: false},
                {display: 'Global<br />MAF', name: 'frequency', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Omicia<br />Score', name: 'omicia', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'V-Score', name: 'vscore', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'G-Score', name: 'gscore', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'Evidence', name: 'evidence', width: '243', sortable: false, align: 'left', nowrap: false}
            ],
            buttons: [
             {name: 'Note', bclass: 'edit', onpress : comeBackLater},
             {name: 'Hide', bclass: 'delete', onpress : comeBackLater},
             {separator: true}
         ],
            sortname: "position",
            sortorder: "ASC",
            usepager: true,
            nowrap: false,
            title: '',
            procmsg: '<div style=\"font-size: 10pt;\">Processing, please wait ...</div>',
            nomsg: function() {enableFilters();return '<div style=\"font-size: 10pt; color: red; font-weight: bold;\">No items</div>';},
            useRp: false,
            rp: 10000,
            query: getVaastDuoValues(),
            showTableToggleBtn: true,
            onError: function(data) {enableFilters();alert(data.responseText);},
            onSuccess: function() {enableFilters();},
            height: getInterpretHeight()
        });
    }

    // IV: vaast trio grid
    if (document.getElementById('vaastTrioReport')) {
        $('#vaastTrioReport').flexigrid ({
            url: '/test/index.php?id=51',
            dataType: 'json',
            colModel: [
                {display: 'Variant<br />Class', name: 'class', width: '90', sortable: false, align: 'left', nowrap: false},
                {display: 'Gene', name: 'gene', width: '75', sortable: false, align: 'left', nowrap: false},
                {display: 'Position<br />dbSNP', name: 'position', width: '85', sortable: false, align: 'center', nowrap: false},
                {display: 'Change', name: 'change', width: '120', sortable: false, align: 'center', nowrap: false},
                {display: 'Proband<br />Zygosity', name: 'zygosity', width: '55', sortable: false, align: 'left', nowrap: false},
                {display: 'Father<br />Zygosity', name: 'zygdad', width: '55', sortable: false, align: 'left', nowrap: false},
                {display: 'Mother<br />Zygosity', name: 'zygmom', width: '55', sortable: false, align: 'left', nowrap: false},
                {display: 'Effect', name: 'effect', width: '80', sortable: false, align: 'left', nowrap: false},
                {display: 'Global<br />MAF', name: 'frequency', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Omicia<br />Score', name: 'omicia', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'V-Score', name: 'vscore', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'G-Score', name: 'gscore', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'Evidence', name: 'evidence', width: '180', sortable: false, align: 'left', nowrap: false}
            ],
            buttons: [
             {name: 'Note', bclass: 'edit', onpress : comeBackLater},
             {name: 'Hide', bclass: 'delete', onpress : comeBackLater},
             {separator: true}
         ],
            sortname: "position",
            sortorder: "ASC",
            usepager: true,
            nowrap: false,
            title: '',
            procmsg: '<div style=\"font-size: 10pt;\">Processing, please wait ...</div>',
            nomsg: function() {enableFilters();return '<div style=\"font-size: 10pt; color: red; font-weight: bold;\">No items</div>';},
            useRp: false,
            rp: 10000,
            query: getVaastTrioValues(),
            showTableToggleBtn: true,
            onError: function(data) {enableFilters();alert(data.responseText);},
            onSuccess: function() {enableFilters();},
            height: getInterpretHeight()
        });
    }

    // IV: vaast quad grid
    if (document.getElementById('vaastQuadReport')) {
        $('#vaastQuadReport').flexigrid ({
            url: '/test/index.php?id=57',
            dataType: 'json',
            colModel: [
                {display: 'Variant<br />Class', name: 'class', width: '90', sortable: false, align: 'left', nowrap: false},
                {display: 'Gene', name: 'gene', width: '60', sortable: false, align: 'left', nowrap: false},
                {display: 'Position<br />dbSNP', name: 'position', width: '80', sortable: false, align: 'center', nowrap: false},
                {display: 'Change', name: 'change', width: '100', sortable: false, align: 'center', nowrap: false},
                {display: 'Proband<br />Zygosity', name: 'zygosity', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Sibling<br />Zygosity', name: 'zygsib', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Father<br />Zygosity', name: 'zygdad', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Mother<br />Zygosity', name: 'zygmom', width: '50', sortable: false, align: 'left', nowrap: false},
                {display: 'Effect', name: 'effect', width: '74', sortable: false, align: 'left', nowrap: false},
                {display: 'Global<br />MAF', name: 'frequency', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Omicia<br />Score', name: 'omicia', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'V-Score', name: 'vscore', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'G-Score', name: 'gscore', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'Evidence', name: 'evidence', width: '180', sortable: false, align: 'left', nowrap: false}
            ],
            buttons: [
             {name: 'Note', bclass: 'edit', onpress : comeBackLater},
             {name: 'Hide', bclass: 'delete', onpress : comeBackLater},
             {separator: true}
         ],
            sortname: "position",
            sortorder: "ASC",
            usepager: true,
            nowrap: false,
            title: '',
            procmsg: '<div style=\"font-size: 10pt;\">Processing, please wait ...</div>',
            nomsg: function() {enableFilters();return '<div style=\"font-size: 10pt; color: red; font-weight: bold;\">No items</div>';},
            useRp: false,
            rp: 10000,
            query: getVaastQuadValues(),
            showTableToggleBtn: true,
            onError: function(data) {enableFilters();alert(data.responseText);},
            onSuccess: function() {enableFilters();},
            height: getInterpretHeight()
        });
    }

     // IV: vaast cohort grid
    if (document.getElementById('vaastCohortReport')) {
        $('#vaastCohortReport').flexigrid ({
            url: '/test/index.php?id=76',
            dataType: 'json',
            colModel: [
                {display: 'Variant<br />Class', name: 'class', width: '90', sortable: false, align: 'left', nowrap: false},
                {display: 'Gene', name: 'gene', width: '80', sortable: false, align: 'left', nowrap: false},
                {display: 'Position<br />dbSNP', name: 'position', width: '85', sortable: false, align: 'center', nowrap: false},
                {display: 'Change', name: 'change', width: '120', sortable: false, align: 'center', nowrap: false},
                {display: 'Proband<br />Zygosity', name: 'zygosity', width: '55', sortable: false, align: 'left', nowrap: false},
                {display: 'Cohort<br />Zygosity', name: 'zygcohort', width: '55', sortable: false, align: 'left', nowrap: false},
                {display: 'Effect', name: 'effect', width: '80', sortable: false, align: 'left', nowrap: false},
                {display: 'Global<br />MAF', name: 'frequency', width: '55', sortable: false, align: 'center', nowrap: false},
                {display: 'Omicia<br />Score', name: 'omicia', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'V-Score', name: 'vscore', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'G-Score', name: 'gscore', width: '55', sortable: false, align: 'right', nowrap: false},
                {display: 'Evidence', name: 'evidence', width: '243', sortable: false, align: 'left', nowrap: false}
            ],
            sortname: "position",
            sortorder: "ASC",
            usepager: true,
            nowrap: false,
            title: '',
            procmsg: '<div style=\"font-size: 10pt;\">Processing, please wait ...</div>',
            nomsg: function() {enableFilters();return '<div style=\"font-size: 10pt; color: red; font-weight: bold;\">No items</div>';},
            useRp: false,
            rp: 10000,
            query: getVaastCohortValues(),
            showTableToggleBtn: true,
            onError: function(data) {enableFilters();alert(data.responseText);},
            onSuccess: function() {enableFilters();},
            height: getInterpretHeight()
        });
    }


/*
    $('[id=moreInfo]').hover(function(event) {
        var popup = $('[id=popup_block]');
        var dh = document.documentElement.clientHeight;
        var dw = document.documentElement.clientWidth;
        var ih = parseInt($(this).height());
        var iw = parseInt($(this).width());
        var ptop = parseInt(event.pageY) + ih;
        var pleft = parseInt(event.pageX) + iw;
        var ph = parseInt($(this).find('[id=popup_block]').height());
        var pw = parseInt($(this).find('[id=popup_block]').width());

        if (ptop + ph >= dh)
            ptop = ptop - ph - ih;
        if (ptop < 0)
            ptop = 0;

        if (pleft + pw >= dw)
            pleft = pleft - pw - iw;
        if (pleft < 0)
            pleft = 0;

        popup.css('top', ptop);
        popup.css('left', pleft);
        $(this).find('[id=popup_block]').show();
    }, function() {
        $(this).find('[id=popup_block]').hide();
    });

    $('#pipelineBtn').click(callPipeline);

*/

});


// set background color for the report columns in the grid
function gridFormat() {
/*    $('#projectGrid tr').each(function(){
        $('td[abbr="genomeId"] >div').addClass("reportCells");
        $('td[abbr="name"] >div').addClass("reportCells");
        $('td[abbr="udate"] >div').addClass("reportCells");
        $('td[abbr="rtype"] >div').addClass("reportCells");
        $('td[abbr="rdate"] >div').addClass("reportCells");
        $('td[abbr="rversion"] >div').addClass("reportCells");
        $('td[abbr="rstatus"] >div').addClass("reportCells");
    }); */
    return true;
}

function create_and_open_dialog_for($img_element) {
    var dialog_id = "evidence_dialog";
    var $dialog_div = $("<div>");
    var position = $img_element.parent().offset();
    var dialogtitle = $img_element.attr("db");
    var position_offset = 10; // pixel
    var height = $img_element.parent().height();
    var dialogHeight = 120;
    var dialogWidth = 400;

    var positionLeft = position.left - (position_offset + dialogWidth);
    var positionTop = position.top - (dialogHeight - height) / 2;

    $dialog_div.append($("<span>").html($img_element.attr("alt")));
    $dialog_div.attr({id: dialog_id, title: dialogtitle});
    $dialog_div.dialog({height: dialogHeight, width: dialogWidth, resizable: true,
        position: [positionLeft, positionTop]}).draggable("option", "containment", [0, 35, 1200, 1200]);

    // $dialog_div.dialog({dialogClass: "alert",
    //                position: [position.left + position_offset, position.top + position_offset]});
    // $(".ui-dialog-titlebar").hide(); // attention, also removes the close button!
}

function showPopup(obj, msg, evt) {
    var popup = document.createElement('div');
    popup.setAttribute('id', 'popup_block');
    popup.setAttribute('position', 'absolute');
    popup.innerHTML = msg;
    obj.append(popup);
    var left = 0;
    var top = 0;

    if (evt === null) {
        left = parseInt(obj.position().left) + parseInt(obj.width()) + 50;
        top = parseInt(obj.position().top);
    } else {
        var parentWidth = parseInt($(evt.target).parent('div').width());
        left = $(evt.target).offset().left + parentWidth + 50;
        top = $(evt.target).offset().top;
    }
    $(popup).css('width', 200);
    $(popup).css('left', left);
    $(popup).css('top', top);
    $(popup).css('overflow', 'hidden');
    $(popup).show();
}

function getHeight() {
    var height = $(window).height() - 295;
    if(height < 300) {
        height = 250;
    }
    return height;
}

function getInterpretHeight() {
    var height = $(window).height() - 395;
    if(height < 300) {
        height = 250;
    }
    return height;
}

function getVRHeight() {
    var height = $(window).height() - 300;
    if(height < 300) {
        height = 250;
    }
    return height;
}

function harCatClick(event) {
    var harCats = $('[name=harCat]');
    var tgtCat = $(event.target);
    harCats.each(function() {
        if(tgtCat.attr('category') == $(this).attr('category')) {
            if($(this).attr('selected') !== 'selected') {
                $(this).attr('selected', 'selected');
                $(this).css('background-color', '#dddddd');
                if($(this).parent().attr('id') == 'harDropdown') {
                    $('[name=harBtn]').css('background-color', '#dddddd');
                } else {
                    $('[name=harBtn]').removeAttr('selected');
                    $('[name=harBtn]').css('background-color', '#ffffff');
                }
            } else {
                $(this).removeAttr('selected');
                $(this).css('background-color', '#ffffff');
                $('[name=harBtn]').css('background-color', '#ffffff');
            }
        } else {
            $(this).removeAttr('selected');
            $(this).css('background-color', '#ffffff');
        }
    });
    updateList();
}
$.fn.hasAttr = function(name) {
    return this.attr(name) !== undefined;
};

function geneSetClick(event) {
    var geneSets = $('[name=disease]');
    var tgtSet = $(event.target);
    geneSets.each(function() {
        if(tgtSet.attr('symbols') == $(this).attr('symbols')) {
            if($(this).attr('selected') != 'selected') {
                $(this).attr('selected', 'selected');
                $(this).css('background-color', '#dddddd');
            } else {
                $(this).removeAttr('selected');
                $(this).css('background-color', '#ffffff');
            }
        } else {
            $(this).removeAttr('selected');
            $(this).css('background-color', '#ffffff');
        }
    });
    updateList();
}

function drugSetClick(event) {
    var drugSets = $('[name=drug]');
    var tgtSet = $(event.target);
    drugSets.each(function() {
        if(tgtSet.attr('symbols') == $(this).attr('symbols')) {
            if($(this).attr('selected') != 'selected') {
                $(this).attr('selected', 'selected');
                $(this).css('background-color', '#dddddd');
            } else {
                $(this).removeAttr('selected');
                $(this).css('background-color', '#ffffff');
            }
        } else {
            $(this).removeAttr('selected');
            $(this).css('background-color', '#ffffff');
        }
    });
    updateList();
}

function pathwaySetClick(event) {
    var pathSets = $('[name=pathway]');
    var tgtSet = $(event.target);
    pathSets.each(function() {
        if(tgtSet.attr('symbols') == $(this).attr('symbols')) {
            if($(this).attr('selected') != 'selected') {
                $(this).attr('selected', 'selected');
                $(this).css('background-color', '#dddddd');
            } else {
                $(this).removeAttr('selected');
                $(this).css('background-color', '#ffffff');
            }
        } else {
            $(this).removeAttr('selected');
            $(this).css('background-color', '#ffffff');
        }
    });
    updateList();
}

function mygeneSetClick(event) {
    var mySets = $('[name=myset]');
    var tgtSet = $(event.target);
    mySets.each(function() {
        if(tgtSet.attr('symbols') == $(this).attr('symbols')) {
            if($(this).attr('selected') != 'selected') {
                $(this).attr('selected', 'selected');
                $(this).css('background-color', '#dddddd');
            } else {
                $(this).removeAttr('selected');
                $(this).css('background-color', '#ffffff');
            }
        } else {
            $(this).removeAttr('selected');
            $(this).css('background-color', '#ffffff');
        }
    });
    updateList();
}

function chromClick(event) {
    var chroms = $('[name=chroms]');
    var tgtChrom = $(event.target);
    chroms.each(function() {
        if(tgtChrom.attr('chr') == $(this).attr('chr')) {
            if($(this).attr('selected') != 'selected') {
                $(this).attr('selected', 'selected');
                $(this).css('background-color', '#dddddd');
            } else {
                $(this).removeAttr('selected');
                $(this).css('background-color', '#ffffff');
            }
        } else {
            $(this).removeAttr('selected');
            $(this).css('background-color', '#ffffff');
        }
    });
    updateList();
}

function filterSettingsClick(event) {
    var filter = $('[name=filter]');
    var tgtFilter = $(event.target);
    filter.each(function() {
        if(tgtFilter.attr('fid') == $(this).attr('fid')) {
            $(this).attr('selected', 'selected');
            var fopt = $(this).attr('fid');
            if (fopt == "1") { // clear filter settings
                clearFilterSettings();
            } else if (fopt == "2") {  // save filter settings
                saveFilterSettings();
            } else if (fopt == "3") { // load saved filters
                showSavedFilters();
            }
        }
    });
}

function projClick(event) {
    var proj = $('[name=projectname]');
    var tgtProj = $(event.target);
    var projLabel = "<b>Project View</b>: " + tgtProj.text();
    $('#left').html(projLabel);
    proj.each(function() {
        if(tgtProj.attr('proj') == $(this).attr('proj')) {
            if($(this).attr('selected') != 'selected') {
                $(this).attr('selected', 'selected');
                $(this).css('background-color', '#dddddd');
            } else {
                $(this).removeAttr('selected');
                $(this).css('background-color', '#ffffff');
            }
        } else {
            $(this).removeAttr('selected');
            $(this).css('background-color', '#ffffff');
        }
    });
    updateProjList();
}

function updateList() {
    var data = getValues();
    disableFilters();
    $('#variantMiner').flexOptions({query: data}).flexReload();
}

function updateProjList() {
    var data = getProjValues();
    $('#projectGrid').flexOptions({query: data}).flexReload();
}

function updateInterpretList(event) {
    var data = getFlexTrioValues();
    $('#flexTrioGrid').flexOptions({query: data}).flexReload();

    var data = getFlexQuadValues();
    var mode = $("input[id=interpretmode]").val();
    var affected = $('[name=affected]').attr('value');
    $('#flexQuadGrid').flexOptions({query: data}).flexReload();

    var data = getVaastSoloValues();
    $('#vaastSoloReport').flexOptions({query: data}).flexReload();

    var data = getVaastDuoValues();
    $('#vaastDuoReport').flexOptions({query: data}).flexReload();

    var data = getVaastTrioValues();
    $('#vaastTrioReport').flexOptions({query: data}).flexReload();

    var data = getVaastQuadValues();
    $('#vaastQuadReport').flexOptions({query: data}).flexReload();

    var data = getVaastCohortValues();
    $('#vaastCohortReport').flexOptions({query: data}).flexReload();
}

function updateVaastTrioList() {
    var data = getVaastTrioValues();
    $('#vaastTrioReport').flexOptions({query: data}).flexReload();
}

function showAll() {
    var kids = $('.content').children();
    kids.each(function() {
        $(this).show();
    });
    var genomes = $('.genome');
    genomes.each(function() {
        $(this).show();
        $(this).next('.reports').show();
    });
    $('.unstarred').each(function() {
        var genome = $(this).parents().filter('.genome');
        genome.show();
        genome.next().show();
    });
}

function selectAll() {
    $("[name=genome-list]").each(function() {
        $(this).attr('checked', true);
    });
}

/*
function clearFilters() {
    $('[name=harCat]').each(function() {
        $(this).removeAttr('selected');
        $(this).css('background-color', '#ffffff');
        $(".diseaseCatDiv").accordion('activate', false);
    });
    $('[name=geneSet]').each(function() {
        $(this).removeAttr('selected');
        $(this).css('background-color', '#ffffff');
        $(".geneSetDiv").accordion('activate', false);
    });
    $('[name=drugSet]').each(function() {
        $(this).removeAttr('selected');
        $(this).css('background-color', '#ffffff');
        $(".drugDiv").accordion('activate', false);
    });
    $('[name=chroms]').each(function() {
        $(this).removeAttr('selected');
        $(this).css('background-color', '#ffffff');
        $(".chromDiv").accordion('activate', false);
    });
    $(".geneSearchDiv").accordion('activate', false);
    $(".filterByDiv").accordion('activate', false);
    $(".showOnlyDiv").accordion('activate', false);
    $(".excludeDiv").accordion('activate', false);
}

function disableAccordions() {
    $(".geneSearchDiv").accordion('disable');
    $(".diseaseCatDiv").accordion('disable');
    $(".geneSetDiv").accordion('disable');
    $(".drugDiv").accordion('disable');
    $(".pathwayDiv").accordion('disable');
    $(".myGeneSetDiv").accordion('disable');
    $(".expressionDiv").accordion('disable');
    $(".copynumDiv").accordion('disable');
    $(".chromDiv").accordion('disable');
    $(".filterByDiv").accordion('disable');
    $(".showOnlyDiv").accordion('disable');
    $(".excludeDiv").accordion('disable');
}

function enableAccordions() {
    $(".geneSearchDiv").accordion('enable');
    $(".diseaseCatDiv").accordion('enable');
    $(".geneSetDiv").accordion('enable');
    $(".drugDiv").accordion('enable');
    $(".pathwayDiv").accordion('enable');
    $(".myGeneSetDiv").accordion('enable');
    $(".expressionDiv").accordion('enable');
    $(".copynumDiv").accordion('enable');
    $(".chromDiv").accordion('enable');
    $(".filterByDiv").accordion('enable');
    $(".showOnlyDiv").accordion('enable');
    $(".excludeDiv").accordion('enable');
}


function deselectAll() {
    $("[name=genome-list]").each(function() {
        $(this).attr('checked', false);
    });
}

function selectStarred() {
    $("[name=genome-list]").each(function() {
        if($(this).next().hasClass('starred')) {
            $(this).attr('checked', true);
        } else {
            $(this).attr('checked', false);
        }
    });
}
*/

function searchGenome() {
    var word = $('[name=searchBox]:text').val();

    if(word != '') {
        $('tr.genome').each(function() {
            var content = $(this).html();
            if(content.match(word)) {
                $(this).show();
                $(this).next('.reports').each(function() {
                    $(this).show();
                });
            } else {
                $(this).hide();
                $(this).next('.reports').each(function() {
                    $(this).hide();
                });
            }
        });
    } else {
        showAll();
    }
}

function updateVals(name, source) {
    var selector = '#'+name+'Vals';
    if(name=='frequency') {
        $(selector + ' #min').html(($(source).slider("values", 0) * 100));
        $(selector + ' #max').html(($(source).slider("values", 1) * 100));
    } else {
        $(selector + ' #min').html($(source).slider("values", 0));
        $(selector + ' #max').html($(source).slider("values", 1));
    }
}

function getValues() {

    var varList = getQueryVariable("varid");

    // check to see if this is the first grid load
    var repstart = $('[name=repstart]').attr('value');
    if (repstart == 1) {
        $('[name=repstart]').val('0');
    } else {
        repstart = 0;
    }

    // get url gene symbols, if any
    var gsymbols = getQueryVariable("gsymbols");
    if (gsymbols != null && gsymbols != "") {
        $('#geneSearchBox:text').val(gsymbols);
    }

    // setup status icons
    var iconDefault = {
        header: "ui-icon-circle-triangle-e",
        headerSelected: "ui-icon-circle-triangle-s"
    };
    var iconSelected = {
        header: "ui-icon-triangle-1-e",
        headerSelected: "ui-icon-triangle-1-s"
    };

    // get genomeId, variantset, pversion
    var genome_id = $('[name=genomeId]').attr('value');
    var vset = $('[name=vset]').attr('value');
    var pversion = $('[name=pversion]').attr('value');
    var reportId = $('[name=reportId]').attr('value');
    var reptype = $('[name=reptype]').attr('value');

    // get gene symbol
    var word = $('#geneSearchBox:text').val();
    if (word != '') {
        $(".geneSearchDiv").accordion("option", "icons", iconDefault);
    } else {
        $( ".geneSearchDiv" ).accordion("option", "icons", iconSelected);
    }

    // get selected disease
    var disease = '';
    $('[name=harCat]').each(function() {
        if ($(this).attr('selected') == 'selected') {
            disease = ($(this).attr('category')!='ALL')?$(this).attr('category'):'' ;
        }
    });
    if (disease != '') {
        $(".diseaseCatDiv").accordion("option", "icons", iconDefault);
    } else {
        $( ".diseaseCatDiv" ).accordion("option", "icons", iconSelected);
    }

    // get selected disease set genes
    var symbols = '';
    $('[name=disease]').each(function() {
        if($(this).attr('selected') == 'selected') {
            symbols += ($(this).attr('symbols')!='')?$(this).attr('symbols'):'';
        }
    });
    if (symbols != '') {
        $(".geneSetDiv").accordion("option", "icons", iconDefault);
    } else {
        $( ".geneSetDiv" ).accordion("option", "icons", iconSelected);
    }

    // get selected drug set genes
    var drugSymbols = '';
    $('[name=drug]').each(function() {
        if($(this).attr('selected') == 'selected') {
            drugSymbols += ($(this).attr('symbols')!='')?$(this).attr('symbols'):'';
        }
    });
    if (drugSymbols != '') {
        $(".drugDiv").accordion("option", "icons", iconDefault);
    } else {
        $( ".drugDiv" ).accordion("option", "icons", iconSelected);
    }

    // get selected pathway set genes
    var pathwaysymbols = '';
    $('[name=pathway]').each(function() {
        if($(this).attr('selected') == 'selected') {
            pathwaysymbols += ($(this).attr('symbols')!='')?$(this).attr('symbols'):'';
        }
    });
    if (pathwaysymbols != '') {
        $(".pathwayDiv").accordion("option", "icons", iconDefault);
    } else {
        $( ".pathwayDiv" ).accordion("option", "icons", iconSelected);
    }
    if (pathwaysymbols != null && pathwaysymbols != "") {
        symbols = symbols + "," + pathwaysymbols;
    }

    // get selected myset genes
    var mysetsymbols = '';
    $('[name=myset]').each(function() {
        if($(this).attr('selected') == 'selected') {
            mysetsymbols += ($(this).attr('symbols')!='')?$(this).attr('symbols'):'';
        }
    });
    if (mysetsymbols != '') {
        $(".myGeneSetDiv").accordion("option", "icons", iconDefault);
    } else {
        $( ".myGeneSetDiv" ).accordion("option", "icons", iconSelected);
    }
    if (mysetsymbols != null && mysetsymbols != "") {
        symbols = symbols + "," + mysetsymbols;
    }

    // get selected chromosome
    var chrom = '';
    $('[name=chroms]').each(function() {
        if($(this).attr('selected') == 'selected') {
            chrom = ($(this).attr('chr')!='')?$(this).attr('chr'):'';
        }
    });
    if (chrom != '') {
        $(".chromDiv").accordion("option", "icons", iconDefault);
    } else {
        $( ".chromDiv" ).accordion("option", "icons", iconSelected);
    }

    // get sliders values
    var qualMin = $("#qualitySlider").slider("values", 0);
    var qualMax = $("#qualitySlider").slider("values", 1);
    var qualMinLimit = $("#qualityVals #min").attr('limit');
    var qualMaxLimit = $("#qualityVals #max").attr('limit');

    var covMin = $("#coverageSlider").slider("values", 0);
    var covMax = $("#coverageSlider").slider("values", 1);
    var covMinLimit = $("#coverageVals #min").attr('limit');
    var covMaxLimit = $("#coverageVals #max").attr('limit');

    var frequencyMin = $("#frequencySlider").slider("values", 0);
    var frequencyMax = $("#frequencySlider").slider("values", 1);

    var siftMin = $("#siftSlider").slider("values", 0);
    var siftMax = $("#siftSlider").slider("values", 1);

    var omiscoreMin = $("#omiscoreSlider").slider("values", 0);
    var omiscoreMax = $("#omiscoreSlider").slider("values", 1);

    // set filter by selected status
    var filterbyStatus = false;
    if (qualMin > qualMinLimit || qualMax < qualMaxLimit) {
        filterbyStatus = true;
    }
    if (covMin > covMinLimit || covMax < covMaxLimit) {
        filterbyStatus = true;
    }
    if (frequencyMin > 0 || frequencyMax < 1) {
        filterbyStatus = true;
    }
    if (siftMin > 0 || siftMax < 1) {
        filterbyStatus = true;
    }
    if (omiscoreMin > 0 || omiscoreMax < 1) {
        filterbyStatus = true;
    }
    if (filterbyStatus) {
        $(".filterByDiv").accordion("option", "icons", iconDefault);
    } else {
        $( ".filterByDiv" ).accordion("option", "icons", iconSelected);
    }

    var requireStatus = false;

    // get zygosity vals
    var het = "";
    if($('[name="hetzygosity"]').is(":checked")) {
        het = "heterozygous";
        requireStatus = true;
    }

    // get zygosity vals
    var hom = "";
    if($('[name="zygosity"]').is(":checked")) {
        hom = "homozygous";
        requireStatus = true;
    }

    //get consequence and mutation
    var consequence = "";
    if($('[name="consequence"]').is(':checked')){
        consequence = "nonsynonymous";
        requireStatus = true;
    }

    //get mutation type values
    var mutation = "";
    $('[name="mutationtype[]"]').each(function() {
        if($(this).is(':checked')) {
            if(mutation != "") {
                mutation += ",";
            }
            mutation += $(this).val();
            requireStatus = true;
        }
    });

    // get supporting evidence
    var allhits = $('[name="allhits"]').is(':checked');
    var omimhits = $('[name="omimhits"]').is(':checked');
    var stronghits = $('[name="stronghits"]').is(':checked');
    if (allhits || omimhits || stronghits) {
        requireStatus = true;
    }

    // get gene models
    var ccds = $('[name="ccds"]').is(':checked');
    var refseq = $('[name="refseq"]').is(':checked');
    if (ccds || refseq) {
        requireStatus = true;
    }

    // get polyphen prediction
    var polyphenD = $('[name="polyphenD"]').is(':checked');
    var polyphenP = $('[name="polyphenP"]').is(':checked');
    if (polyphenD || polyphenP) {
        requireStatus = true;
    }

    // set required checked status
    if (requireStatus) {
        $(".showOnlyDiv").accordion("option", "icons", iconDefault);
    } else {
        $( ".showOnlyDiv" ).accordion("option", "icons", iconSelected);
    }

    var excludeStatus = false;

    // get region
    var intronic = $('[name="intronic"]').is(':checked');
    var intergenic = $('[name="intergenic"]').is(':checked');
    if (intronic || intergenic) {
        excludeStatus = true;
    }

    // get dbsnp
    var dbsnp = $('[name="dbsnp"]').is(':checked');
    if (dbsnp) {
        excludeStatus = true;
    }

    // get polymorphic
    var polymorph = $('[name="polymorph"]').is(':checked');
    var znf = $('[name="znf"]').is(':checked');
    var or = $('[name="or"]').is(':checked');
    var sno = $('[name="sno"]').is(':checked');
    var tcr = $('[name="tcr"]').is(':checked');
    var hla = $('[name="hla"]').is(':checked');
    var muc = $('[name="muc"]').is(':checked');
    if (polymorph || znf || or ||sno || tcr || hla || muc) {
        excludeStatus = true;
    }

    // get other
    var nocall = $('[name="nocall"]').is(':checked');
    var noncoding = $('[name="noncoding"]').is(':checked');
    if (nocall || noncoding) {
        excludeStatus = true;
    }

    // set exclude checked status
    if (excludeStatus) {
        $(".excludeDiv").accordion("option", "icons", iconDefault);
    } else {
        $( ".excludeDiv" ).accordion("option", "icons", iconSelected);
    }

    // get selected sort order and set selected icon status
    $(".sortDiv").accordion("option", "icons", iconDefault);
    var sortorder = $('input[name="sort"]:checked').attr('value');

    var data = {
        genomeId: genome_id,
        vset: vset,
        pversion: pversion,
        reportId: reportId,
        repstart: repstart,
        reptype: "VM",
        varList: varList,
        genesymbol: word,
        disease: disease,
        geneset: symbols,
        drugset: drugSymbols,
        chrom: chrom,
        quality: {
            min: qualMin,
            max: qualMax,
            minLimit: qualMinLimit,
            maxLimit: qualMaxLimit
        },
        coverage: {
            min: covMin,
            max: covMax,
            minLimit: covMinLimit,
            maxLimit: covMaxLimit
        },
        frequency: {
            min: frequencyMin,
            max: frequencyMax
        },
        sift: {
            min: siftMin,
            max: siftMax
        },
        omiscore: {
            min: omiscoreMin,
            max: omiscoreMax
        },
        hetzygosity:  het,
        zygosity:  hom,
        consequence: consequence,
        mutationtype: mutation,
        dbsnp: dbsnp,
        intronic: intronic,
        intergenic: intergenic,
        nocall: nocall,
        noncoding: noncoding,
        polyphenD: polyphenD,
        polyphenP: polyphenP,
        ccds: ccds,
        refseq: refseq,
        polymorph: polymorph,
        znf: znf,
        or: or,
        sno: sno,
        tcr: tcr,
        hla: hla,
        muc: muc,
        omimhits: omimhits,
        stronghits: stronghits,
        allhits: allhits,
        sortorder: sortorder
    };
    return JSON.stringify(data);
}


function getVRValues() {
    // get genomeId, variantset, pversion
    var vset = $('[name=vset]').attr('value');
    var genomeId = $('[name=genomeId]').attr('value');
    var pversion = $('[name=pversion]').attr('value');
    var reportId = $('[name=reportId]').attr('value');
    // check to see if this is the first grid load
    var repstart = $('[name=repstart]').attr('value');
    if (repstart == 1) {
        $('[name=repstart]').val('0');
    } else {
        repstart = 0;
    }
    // define default filter
    var filter = {
        "genomeId" : genomeId,
        "vset" : vset,
        "pversion" : pversion,
        "repstart": repstart,
        "reptype": "VR",
        "reportId": reportId,
        "varList" : "",
        "genesymbol" : "",
        "disease" : "",
        "geneset" : "",
        "drugset" : "",
        "chrom" : "",
        "quality" : {
            "min" : 0,
            "max" : 227,
            "minLimit" : "0",
            "maxLimit" : "227"
        },
        "coverage" : {
            "min" : 0,
            "max" : 92,
            "minLimit" : "0",
            "maxLimit" : "92"
        },
        "frequency" : {
            "min" : 0,
            "max" : 1
        },
        "sift" : {
            "min" : 0,
            "max" : 1
        },
        "omiscore" : {
            "min" : 0,
            "max" : 1
        },
        "hetzygosity" : "",
        "zygosity" : "",
        "consequence" : "nonsynonymous",
        "mutationtype" : "",
        "dbsnp" : false,
        "intronic" : true,
        "intergenic" : true,
        "nocall" : true,
        "noncoding" : true,
        "polyphenD" : false,
        "polyphenP" : false,
        "ccds" : false,
        "refseq" : false,
        "polymorph" : false,
        "znf" : false,
        "or" : false,
        "sno" : false,
        "tcr" : false,
        "hla" : false,
        "muc" : false,
        "omimhits" : false,
        "stronghits" : false,
        "allhits" : false,
        "sortorder" : "position"
    };
    return JSON.stringify(filter);
}


function getFlexTrioValues() {
    // get genomeId, variantset, pversion
    var genome_id = $('[name=genomeId]').attr('value');
    var vset = $('[name=vset]').attr('value');
    var pversion = $('[name=pversion]').attr('value');
    // get father, mother
    var father = $('[name=father]').attr('value');
    var mother = $('[name=mother]').attr('value');
    // get filter, mode
    var mode = $("input[id=interpretmode]").val();
    var filter = $('[name=filter]').attr('value');
    var filter = $("#flexFilter option:selected").attr('value');

    // construct json object
    var data = {
        genomeId: genome_id,
        vset: vset,
        mode: mode,
        pversion: pversion,
        child: genome_id,
        father: father,
        mother: mother,
        filter: filter
    };
    return JSON.stringify(data);
}

function getFlexQuadValues() {
    // get genomeId, variantset, pversion
    var genome_id = $('[name=genomeId]').attr('value');
    var vset = $('[name=vset]').attr('value');
    var pversion = $('[name=pversion]').attr('value');
    // get sibling, father, mother
    var sibling = $('[name=sibling]').attr('value');
    var father = $('[name=father]').attr('value');
    var mother = $('[name=mother]').attr('value');
    // get filter, mode, affected
    var mode = $("input[id=interpretmode]").val();
    var filter = $('[name=filter]').attr('value');
    var filter = $("#flexFilter option:selected").attr('value');
    var affected = $('[name=affected]').attr('value');
    // construct json object
    var data = {
        genomeId: genome_id,
        vset: vset,
        mode: mode,
        pversion: pversion,
        child: genome_id,
        sibling: sibling,
        father: father,
        mother: mother,
        filter: filter,
        affected: affected
    };
    return JSON.stringify(data);
}

function getVaastSoloValues() {
    // get genomeId, variantset, pversion
    var genome_id = $('[name=genomeId]').attr('value');
    var run = $('[name=run]').attr('value');
    var pversion = $('[name=pversion]').attr('value');
    // get filter, mode
    var mode = $("input[id=interpretmode]").val();
    var backg = $('[name=backg]').attr('value');
    // get filter values
    var polyFilter = "NONE";
    var genesetFilter = "NONE";
    var vaastscoreFilterMin = 0;
    if ($(".vaast_filter").size()) {
        polyFilter = $("#vaastPolymorphic option:selected").attr('value');
        genesetFilter = $("#vaastGeneSet option:selected").attr('value');
        vaastscoreFilterMin = $("#vaast_score_range").slider("value");
    }
    // construct json object
    var data = {
        genomeId: genome_id,
        run: run,
        mode: mode,
        pversion: pversion,
        individual: genome_id,
        backg: backg,
        polyFilter: polyFilter,
        genesetFilter: genesetFilter,
        vaastscoreFilterMin: vaastscoreFilterMin
    };
    return JSON.stringify(data);
}

function getVaastDuoValues() {
    // get genomeId, variantset, pversion
    var genome_id = $('[name=genomeId]').attr('value');
    var run = $('[name=run]').attr('value');
    var pversion = $('[name=pversion]').attr('value');
    // get father, mother, filter
    var parent = $('[name=parent]').attr('value');
    // get filter, mode
    var mode = $("input[id=interpretmode]").val();
    var backg = $('[name=backg]').attr('value');
    // get filter values
    var polyFilter = "NONE";
    var genesetFilter = "NONE";
    var vaastscoreFilterMin = 0;
    if ($(".vaast_filter").size()) {
        polyFilter = $("#vaastPolymorphic option:selected").attr('value');
        genesetFilter = $("#vaastGeneSet option:selected").attr('value');
        vaastscoreFilterMin = $("#vaast_score_range").slider("value");
    }
    // construct json object
    var data = {
        genomeId: genome_id,
        run: run,
        mode: mode,
        pversion: pversion,
        child: genome_id,
        parent: parent,
        backg: backg,
        polyFilter: polyFilter,
        genesetFilter: genesetFilter,
        vaastscoreFilterMin: vaastscoreFilterMin
    };
    return JSON.stringify(data);
}

function getVaastTrioValues() {
    // get genomeId, variantset, pversion
    var genome_id = $('[name=genomeId]').attr('value');
    var run = $('[name=run]').attr('value');
    var pversion = $('[name=pversion]').attr('value');
    // get father, mother, filter
    var father = $('[name=father]').attr('value');
    var mother = $('[name=mother]').attr('value');
    // get filter, mode
    var mode = $("input[id=interpretmode]").val();
    var backg = $('[name=backg]').attr('value');
    // get filter values
    var polyFilter = "NONE";
    var genesetFilter = "NONE";
    var vaastscoreFilterMin = 0;
    if ($(".vaast_filter").size()) {
        polyFilter = $("#vaastPolymorphic option:selected").attr('value');
        genesetFilter = $("#vaastGeneSet option:selected").attr('value');
        vaastscoreFilterMin = $("#vaast_score_range").slider("value");
    }
    // construct json object
    var data = {
        genomeId: genome_id,
        run: run,
        mode: mode,
        pversion: pversion,
        child: genome_id,
        father: father,
        mother: mother,
        backg: backg,
        polyFilter: polyFilter,
        genesetFilter: genesetFilter,
        vaastscoreFilterMin: vaastscoreFilterMin
    };
    return JSON.stringify(data);
}

function getVaastQuadValues() {
    // get genomeId, variantset, pversion
    var genome_id = $('[name=genomeId]').attr('value');
    var run = $('[name=run]').attr('value');
    var pversion = $('[name=pversion]').attr('value');
    // get sibling, father, mother, filter
    var sibling = $('[name=sibling]').attr('value');
    var father = $('[name=father]').attr('value');
    var mother = $('[name=mother]').attr('value');
    // get filter, mode
    var mode = $("input[id=interpretmode]").val();
    var backg = $('[name=backg]').attr('value');
    // get filter values
    var polyFilter = "NONE";
    var genesetFilter = "NONE";
    var vaastscoreFilterMin = 0;
    if ($(".vaast_filter").size()) {
        polyFilter = $("#vaastPolymorphic option:selected").attr('value');
        genesetFilter = $("#vaastGeneSet option:selected").attr('value');
        vaastscoreFilterMin = $("#vaast_score_range").slider("value");
    }
    // construct json object
    var data = {
        genomeId: genome_id,
        run: run,
        mode: mode,
        pversion: pversion,
        child: genome_id,
        sibling: sibling,
        father: father,
        mother: mother,
        backg: backg,
        polyFilter: polyFilter,
        genesetFilter: genesetFilter,
        vaastscoreFilterMin: vaastscoreFilterMin
    };
    return JSON.stringify(data);
}

function getVaastCohortValues() {
    // get genomeId, variantset, pversion
    var genomeId = $('[name=genomeId]').attr('value');
    var run = $('[name=run]').attr('value');
    var pversion = $('[name=pversion]').attr('value');
    var reportId = $('[name=reportId]').attr('value');
   // get filter, mode
    var mode = $("input[id=interpretmode]").val();
    var backg = $('[name=backg]').attr('value');
    // get filter values
    var polyFilter = "NONE";
    var genesetFilter = "NONE";
    var vaastscoreFilterMin = 0;
    if ($(".vaast_filter").size()) {
        polyFilter = $("#vaastPolymorphic option:selected").attr('value');
        genesetFilter = $("#vaastGeneSet option:selected").attr('value');
        vaastscoreFilterMin = $("#vaast_score_range").slider("value");
    }
    // construct json object
    var data = {
        genomeId: genomeId,
        run: run,
        mode: mode,
        pversion: pversion,
        reportId: reportId,
        proband: genomeId,
        backg: backg,
        polyFilter: polyFilter,
        genesetFilter: genesetFilter,
        vaastscoreFilterMin: vaastscoreFilterMin
    };
    return JSON.stringify(data);
}


function validateGeneSymbols() {
    // get entered values
    var gene = "";
    var gene = $('#geneSearchBox:text').val();
    gene = $.trim(gene);
    if (gene.length > 0) {
        // gene = gene.replace(/[,\n\r]/g," ");
        gene = gene.replace(/[^a-zA-Z_0-9- ,]/g,"");
        if (gene.length > 0) {
            // alert(">"+gene+"<");
            $.post('/test/index.php?id=34',{"action": "validate symbols", "gene": gene},
                function(data) {
                    if (data.length > 0) {
                        $('#geneSearchBox:text').val(data);
                        updateList();
                    } else {
                        $('#geneSearchBox:text').val("");
                    }
            });
        } else {
            $('#geneSearchBox:text').val("");
        }
    } else {
        updateList();
    }
}

function getSelectedFilterId() {
    // get saved filter id
    var filterId = '';
    $('[name=filter]').each(function() {
        if($(this).attr('selected') == 'true') {
            filterId = ($(this).attr('fid')!='')?$(this).attr('fid'):'';
        }
    });
    return filterId;
}

function setSavedFilters(data) {

    var filter = JSON.parse(data);

    // set gene symbol
    if (empty(filter.genesymbol)) {
        $('#geneSearchBox:text').val("");
    } else {
        $('#geneSearchBox:text').val(filter.genesymbol);
    }

    // set selected disease
    if (!empty(filter.disease)) {
        $('[name=harCat]').each(function() {
            if($(this).attr('category') == filter.disease) {
                $(this).attr('selected','true');
                $(this).css('background-color', '#dddddd');
            }
        });
    }

    // set selected gene set
    if (!empty(filter.geneset)) {
        $('[name=disease]').each(function() {
            if($(this).attr('symbols') == filter.geneset) {
                $(this).attr('selected','true');
                $(this).css('background-color', '#dddddd');
            }
        });
    }

    // set selected drug set
    if (!empty(filter.drugset)) {
        $('[name=drug]').each(function() {
            if($(this).attr('symbols') == filter.drugset) {
                $(this).attr('selected','true');
                $(this).css('background-color', '#dddddd');
            }
        });
    }

    // set selected chromosome
    if (!empty(filter.chrom)) {
        $('[name=chroms]').each(function() {
            if($(this).attr('chr') == filter.chrom) {
                $(this).attr('selected','true');
                $(this).css('background-color', '#dddddd');
            }
        });
    }

    // set the sliders
    if (!empty(filter.coverage.max)) {
        $("#coverageSlider").slider( "option", "values", [filter.coverage.min,filter.coverage.max] );
        updateVals('coverage', $("#coverageSlider"));

    }

    if (!empty(filter.quality.max)) {
        $("#qualitySlider").slider( "option", "values", [filter.quality.min,filter.quality.max] );
        updateVals('quality', $("#qualitySlider"));
    }

    if (!empty(filter.frequency.max)) {
        $("#frequencySlider").slider( "option", "values", [filter.frequency.min,filter.frequency.max] );
        updateVals('frequency', $("#frequencySlider"));
    }

    if (!empty(filter.sift.max)) {
        $("#siftSlider").slider( "option", "values", [filter.sift.min,filter.sift.max]);
        updateVals('sift', $("#siftSlider"));
    }

    if (!empty(filter.omiscore.max)) {
        $("#omiscoreSlider").slider( "option", "values", [filter.omiscore.min,filter.omiscore.max]);
        updateVals('omiscore', $("#omiscoreSlider"));
    }

    // set check boxes
    if (filter.hetzygosity) {
        $('[name="hetzygosity"]').attr("checked", "checked");
    } else {
        $('[name="hetzygosity"]').removeAttr("checked");
    }
    if (filter.zygosity) {
        $('[name="zygosity"]').attr("checked", "checked");
    } else {
        $('[name="zygosity"]').removeAttr("checked");
    }

    if (filter.consequence) {
        $('[name="consequence"]').attr("checked", "checked");
    } else {
        $('[name="consequence"]').removeAttr("checked");
    }

    if (filter.dbsnp) {
        $('[name="dbsnp"]').attr("checked", "checked");
    } else {
        $('[name="dbsnp"]').removeAttr("checked");
    }

    if (filter.intronic) {
        $('[name="intronic"]').attr("checked", "checked");
    } else {
        $('[name="intronic"]').removeAttr("checked");
    }

    if (filter.intergenic) {
        $('[name="intergenic"]').attr("checked", "checked");
    } else {
        $('[name="intergenic"]').removeAttr("checked");
    }

    if (filter.nocall) {
        $('[name="nocall"]').attr("checked", "checked");
    } else {
        $('[name="nocall"]').removeAttr("checked");
    }

    if (filter.noncoding) {
        $('[name="noncoding"]').attr("checked", "checked");
    } else {
        $('[name="noncoding"]').removeAttr("checked");
    }

    if (filter.polyphenD) {
        $('[name="polyphenD"]').attr("checked", "checked");
    } else {
        $('[name="polyphenD"]').removeAttr("checked");
    }

    if (filter.polyphenP) {
        $('[name="polyphenP"]').attr("checked", "checked");
    } else {
        $('[name="polyphenP"]').removeAttr("checked");
    }

    if (filter.allhits) {
        $('[name="allhits"]').attr("checked", "checked");
    } else {
        $('[name="allhits"]').removeAttr("checked");
    }

    if (filter.stronghits) {
        $('[name="stronghits"]').attr("checked", "checked");
    } else {
        $('[name="stronghits"]').removeAttr("checked");
    }

    if (filter.omimhits) {
        $('[name="omimhits"]').attr("checked", "checked");
    } else {
        $('[name="omimhits"]').removeAttr("checked");
    }

    if (filter.ccds) {
        $('[name="ccds"]').attr("checked", "checked");
    } else {
        $('[name="ccds"]').removeAttr("checked");
    }

    if (filter.refseq) {
        $('[name="refseq"]').attr("checked", "checked");
    } else {
        $('[name="refseq"]').removeAttr("checked");
    }

    if (filter.polymorph) {
        $('[name="polymorph"]').attr("checked", "checked");
    } else {
        $('[name="polymorph"]').removeAttr("checked");
    }

    if (filter.znf) {
        $('[name="znf"]').attr("checked", "checked");
    } else {
        $('[name="znf"]').removeAttr("checked");
    }

    if (filter.or) {
        $('[name="or"]').attr("checked", "checked");
    } else {
        $('[name="or"]').removeAttr("checked");
    }

    if (filter.sno) {
        $('[name="sno"]').attr("checked", "checked");
    } else {
        $('[name="sno"]').removeAttr("checked");
    }

    if (filter.tcr) {
        $('[name="tcr"]').attr("checked", "checked");
    } else {
        $('[name="tcr"]').removeAttr("checked");
    }

    if (filter.hla) {
        $('[name="hla"]').attr("checked", "checked");
    } else {
        $('[name="hla"]').removeAttr("checked");
    }

    if (filter.muc) {
        $('[name="muc"]').attr("checked", "checked");
    } else {
        $('[name="muc"]').removeAttr("checked");
    }

    // special case: set mutation type check boxes
    if (!empty(filter.mutationtype)) {

        var mut = filter.mutationtype.split(",");
        var stoploc = mut.indexOf("stop_gained_lost");
        var indeloc = mut.indexOf("insertion_deletion_a");
        var spliceloc = mut.indexOf("splice_site");
        var nonsynloc = mut.indexOf("plain_nonsynonymous");

        if (stoploc != -1) {
            $('[name="mutationtype[]"][value="stop_gained_lost"]').attr("checked", "checked");
        } else {
            $('[name="mutationtype[]"][value="stop_gained_lost"]').removeAttr("checked");
        }

        if (indeloc != -1) {
            $('[name="mutationtype[]"][value="insertion_deletion_a"]').attr("checked", "checked");
        } else {
            $('[name="mutationtype[]"][value="insertion_deletion_a"]').removeAttr("checked");
        }

        if (spliceloc != -1) {
            $('[name="mutationtype[]"][value="splice_site"]').attr("checked", "checked");
        } else {
            $('[name="mutationtype[]"][value="splice_site"]').removeAttr("checked");
        }

        if (nonsynloc != -1) {
            $('[name="mutationtype[]"][value="plain_nonsynonymous"]').attr("checked", "checked");
        } else {
            $('[name="mutationtype[]"][value="plain_nonsynonymous"]').removeAttr("checked");
        }

    } else {
        $('[name="mutationtype[]"][value="stop_gained_lost"]').removeAttr("checked");
        $('[name="mutationtype[]"][value="insertion_deletion_a"]').removeAttr("checked");
        $('[name="mutationtype[]"][value="splice_site"]').removeAttr("checked");
        $('[name="mutationtype[]"][value="plain_nonsynonymous"]').removeAttr("checked");
    }

    // set saved sort order
    if (!empty(filter.sortorder)) {
        $('[name="sort"][value="'+filter.sortorder+'"]').attr("checked", "checked");
    }

    // set correct report type and state
    filter.reptype = $('[name=reptype]').attr('value');
    filter.repstart = $('[name=repstart]').attr('value');
    data = JSON.stringify(filter);

    $('#variantMiner').flexOptions({query: data}).flexReload();
    $('#variantReport').flexOptions({query: data}).flexReload();

}

function setDefaultFilters() {

    // clear gene symbol
    $('#geneSearchBox:text').val("");

    // clear selected disease
    $('[name=harCat]').each(function() {
        $(this).removeAttr('selected')
        $(this).css('background-color', '#ffffff');
    });

    // clear selected gene set
    $('[name=disease]').each(function() {
        $(this).removeAttr('selected')
        $(this).css('background-color', '#ffffff');
    });

    // clear selected drug set
    $('[name=drug]').each(function() {
        $(this).removeAttr('selected')
        $(this).css('background-color', '#ffffff');
    });

    // clear selected pathway set
    $('[name=pathway]').each(function() {
        $(this).removeAttr('selected')
        $(this).css('background-color', '#ffffff');
    });

    // clear selected my set
    $('[name=myset]').each(function() {
        $(this).removeAttr('selected')
        $(this).css('background-color', '#ffffff');
    });

    // clear selected chromosome
    $('[name=chroms]').each(function() {
        $(this).removeAttr('selected')
        $(this).css('background-color', '#ffffff');
    });

    // clear the sliders
    $("#coverageSlider").slider( "option", "values", [0,9999999] );
    $("#qualitySlider").slider( "option", "values", [0,9999999] );
    $("#frequencySlider").slider( "option", "values", [0,1] );
    $("#siftSlider").slider( "option", "values", [0,1]);
    $("#omiscoreSlider").slider( "option", "values", [0,1]);

    // update visbile filter by values
    updateVals('coverage', $("#coverageSlider"));
    updateVals('quality', $("#qualitySlider"));
    updateVals('frequency', $("#frequencySlider"));
    updateVals('sift', $("#siftSlider"));
    updateVals('omiscore', $("#omiscoreSlider"));

    // clear show mutation type check boxes
    $('[name="mutationtype[]"][value="stop_gained_lost"]').removeAttr("checked");
    $('[name="mutationtype[]"][value="insertion_deletion_a"]').removeAttr("checked");
    $('[name="mutationtype[]"][value="splice_site"]').removeAttr("checked");
    $('[name="mutationtype[]"][value="plain_nonsynonymous"]').removeAttr("checked");
    $('[name="zygosity"]').removeAttr("checked");
    $('[name="hetzygosity"]').removeAttr("checked");
    // clear show evidence check boxes
    $('[name="allhits"]').removeAttr("checked");
    $('[name="omimhits"]').removeAttr("checked");
    $('[name="stronghits"]').removeAttr("checked");
    $('[name="ccds"]').removeAttr("checked");
    $('[name="refseq"]').removeAttr("checked");
    $('[name="polyphenD"]').removeAttr("checked");
    $('[name="polyphenP"]').removeAttr("checked");
    $('[name="polymorph"]').removeAttr("checked");
    $('[name="znf"]').removeAttr("checked");
    $('[name="or"]').removeAttr("checked");
    $('[name="sno"]').removeAttr("checked");
    $('[name="tcr"]').removeAttr("checked");
    $('[name="hla"]').removeAttr("checked");
    $('[name="muc"]').removeAttr("checked");
    $('[name="dbsnp"]').removeAttr("checked");

    // set default check boxes
    $('[name="consequence"]').attr("checked", "checked");
    // $('[name="refseq"]').attr("checked", "checked");
    $('[name="intronic"]').attr("checked", "checked");
    $('[name="intergenic"]').attr("checked", "checked");
    $('[name="nocall"]').attr("checked", "checked");
    $('[name="noncoding"]').attr("checked", "checked");

    // set default sort order
    $('[name="sort"][value="position"]').attr("checked", "checked");
}

function handleHetZygCheck() {
    $('[name="zygosity"]').removeAttr("checked");
    updateList();
}

function handleSortCheck() {
    updateList();
}

function handleHomZygCheck() {
    $('[name="hetzygosity"]').removeAttr("checked");
    updateList();
}

function handleRefSeqCheck() {
    $('[name="ccds"]').removeAttr("checked");
    updateList();
}

function handleCCDSCheck() {
    $('[name="refseq"]').removeAttr("checked");
    updateList();
}

function handleAllHitsCheck() {
    $('[name="stronghits"]').removeAttr("checked");
    $('[name="omimhits"]').removeAttr("checked");
    updateList();
}

function handleOmimHitsCheck() {
    $('[name="stronghits"]').removeAttr("checked");
    $('[name="allhits"]').removeAttr("checked");
    updateList();
}

function handleStrongHitsCheck() {
    $('[name="omimhits"]').removeAttr("checked");
    $('[name="allhits"]').removeAttr("checked");
    updateList();
}

function handlePolymorphAllCheck() {
    $('[name="znf"]').removeAttr("checked");
    $('[name="or"]').removeAttr("checked");
    $('[name="sno"]').removeAttr("checked");
    $('[name="tcr"]').removeAttr("checked");
    $('[name="hla"]').removeAttr("checked");
    $('[name="muc"]').removeAttr("checked");
    updateList();
}

function handlePolymorphCheck() {
    $('[name="polymorph"]').removeAttr("checked");
    updateList();
}

function handleConsequenceAllCheck() {
    $('[name="mutationtype[]"][value="stop_gained_lost"]').removeAttr("checked");
    $('[name="mutationtype[]"][value="insertion_deletion_a"]').removeAttr("checked");
    $('[name="mutationtype[]"][value="splice_site"]').removeAttr("checked");
    $('[name="mutationtype[]"][value="plain_nonsynonymous"]').removeAttr("checked");
    updateList();
}

function handleConsequenceCheck() {
    $('[name="consequence"]').removeAttr("checked");
    updateList();
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getProjValues() {
    var proj = "";
    // get selected project from choice list
    $('[name=projectname]').each(function() {
        if ($(this).attr('selected') == 'selected') {
            // proj = ($(this).attr('proj')!=null)?$(this).attr('proj'):'';
            proj = $(this).attr('proj');
        }
    });

    //set or get projectId cookie
    if (proj == "" || proj == null) {
        proj = Get_Cookie("projectId");
        if (empty(proj)) {
            proj = 1;
        }
    } else {
        document.cookie = "projectId=" + proj;
    }
    var data = {projectId: proj};
    return JSON.stringify(data);
}

function Get_Cookie( check_name ) {
    // first we'll split this cookie up into name/value pairs
    // note: document.cookie only returns name=value, not the other components
    var a_all_cookies = document.cookie.split( ';' );
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false; // set boolean t/f default f

    for ( i = 0; i < a_all_cookies.length; i++ )
    {
        // now we'll split apart each name=value pair
        a_temp_cookie = a_all_cookies[i].split( '=' );


        // and trim left/right whitespace while we're at it
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

        // if the extracted name matches passed check_name
        if ( cookie_name == check_name )
        {
            b_cookie_found = true;
            // we need to handle case where cookie has no value but exists (no = sign, that is):
            if ( a_temp_cookie.length > 1 )
            {
                cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
            }
            // note that in cases where cookie is initialized but no value, null is returned
            return cookie_value;
            break;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if ( !b_cookie_found )
    {
        return null;
    }
}

function disableFilters() {
    var newdiv = $('div.block');
        newdiv.attr('id', 'block');
        newdiv.css('width', $('div.commCont').width());
        newdiv.css('height', $('div.commCont').height());
        newdiv.css('left', $('div.commCont').css('left'));
        newdiv.css('top', $('div.commCont').css('top'));
        newdiv.css('opacity', '0.5');
        newdiv.css('filter', 'alpha(opacity=0.5)');
        newdiv.css('position', 'absolute');
        newdiv.css('z-index', '1000');
        newdiv.css('background-color', '#fff');
        newdiv.innerHTML = 'Updating data...';
        newdiv.click(function(event) {
        event.stopPropagation();
    });
    $(newdiv).show();
}

function enableFilters() {
    $('div.block').hide();
}

/*
function callPipeline() {
    var genomeIds="";
    $("[name=genome-list]:checked").each(function() {
        var wkps = $(this).parents('div').first().attr('name')
        if(wkps != "Community Workspace") {
            genomeIds += (genomeIds == "")?$(this).val():","+$(this).val();
        }
    });
    if(genomeIds.trim() != "") {
        $.ajax({
            url: 'index.php?id=13',     // callPipeline
            type: 'POST',
            dataType: 'json',
            data: {genomeId: genomeIds},
            success: function(data) {
                if(data.error === true) {
                    alert("There was an error submitting your genome/s to the pipeline\nMessage: "+data.msg);
                } else {
                    alert("Genome/s marked to be annotated:\n"+data.msg);
                }
            },
            error: function(req, text, err) {alert("Invalid call");}
        });
    }
}
*/

function clearFilterSettings() {
    setDefaultFilters();
    updateList();
    $('#versionHistory').html("Not a Saved Version");
}

function getSavedFilters(filterId) {
    $.post("index.php?id=26", {"filterId": filterId},
     function(data){
        setDefaultFilters();
        setSavedFilters(data);
     },"json");
}

function saveFilterSettings() {
    var name = prompt ("Enter filter name:","My Filter");
    if (name != null && name != "") {
        var filter = getValues();
        alert (filter);
        $.post("index.php?id=24", {"name": name,"filter": escape(filter)},
        function(){
            updateList();
        },
        "json"
        );
    }
}

//upload process
function startUpload(){
    document.getElementById('f1_upload_process').style.visibility = 'visible';
    $('[class="ui-dialog-title"]').text('Uploading...');
    var filepath=$('[type="file"]').val();
    var substr = filepath.replace(/^.*[\\\/]/, '');
    $('#f1_upload_process').html('<img src="assets/templates/genrep/images/upload.gif" /><br/><br/ >Uploading "'+substr+'"');
    document.getElementById('gvfupload_form').style.visibility = 'hidden';
    $('[class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"]').hide();
    $('#result').html('');
    return true;
}

function stopUpload(success) {
    var filepath=$('[type="file"]').val();
    var filename = filepath.replace(/^.*[\\\/]/, '');
    var result = '';
    if (success == 1) {
        $('#result').attr({'class':'showAtCenter'});
        result = 'Upload of "'+filename +'" Completed<br/><br/>';
        result+= '<input type="button" value="Upload Another Variant File?" onclick="showFormAgain();"/>';
        document.getElementById('gvfupload_form').style.visibility = 'hidden';
        $('[class="ui-dialog-title"]').text('Upload Completed');
    } else if (success == 2) {
        result = '<strong style="color: #f33;">An error occured when uploading the file.</strong><br/><br/>';
        document.getElementById('gvfupload_form').style.visibility = 'visible';
        $('[class="ui-dialog-title"]').text('Variant File Upload');
        $('#result').attr({'class':'showAtTop'});
    } else if (success == 4) {
        result = '<strong style="color: #f33;">'+filename+' is invalid.</strong><br/><br/>';
        document.getElementById('gvfupload_form').style.visibility = 'visible';
        $('[class="ui-dialog-title"]').text('Variant File Upload');
        $('#result').attr({'class':'showAtTop'});
    } else if (success == 3) {
        result = '<strong style="color: #f33;">A file with the name '+filename+' already exists.</strong><br/><br/>';
        document.getElementById('gvfupload_form').style.visibility = 'visible';
        $('[class="ui-dialog-title"]').text('Variant File Upload');
        $('#result').attr({'class':'showAtTop'});
    } else if (success == 5) {
        result = '<strong style="color: #f33;">'+filename+' is too big, files up to 2147483648 bytes can be uploaded.</strong><br/><br/>';
        document.getElementById('gvfupload_form').style.visibility = 'visible';
        $('[class="ui-dialog-title"]').text('Variant File Upload');
        $('#result').attr({'class':'showAtTop'});
    } else if (success == 6) {
        result = '<strong style="color: #f33;">Only files with extension(s) .gvf .vcf .zip .gz and .bz2 are allowed.</strong><br/><br/>';
        document.getElementById('gvfupload_form').style.visibility = 'visible';
        $('[class="ui-dialog-title"]').text('Variant File Upload');
        $('#result').attr({'class':'showAtTop'});
    } else if (success == 7) {
        result = '<strong style="color: #f33;">No file was Selected</strong><br/><br/>';
        document.getElementById('gvfupload_form').style.visibility = 'visible';
        $('[class="ui-dialog-title"]').text('Variant File Upload');
        $('#result').attr({'class':'showAtTop'});
    } else if (success == 8) {
        result = '<strong style="color: #f33;">Upload Failed - Project does not have "write" permission.</strong><br/><br/>';
        document.getElementById('gvfupload_form').style.visibility = 'visible';
        $('[class="ui-dialog-title"]').text('Variant File Upload');
        $('#result').attr({'class':'showAtTop'});
    } else {
        result = '<strong style="color: #f33;">Unexpected Error : '+success+'</strong><br/><br/>';
        document.getElementById('gvfupload_form').style.visibility = 'visible';
        $('[class="ui-dialog-title"]').text('Variant File Upload');
        $('#result').attr({'class':'showAtTop'});
    }
    document.getElementById('f1_upload_process').style.visibility = 'hidden';
    $('#result').html(result);
    return true;
}

function showFormAgain() {
    $('#result').html('');
    $('#result').attr({'class':'showAtTop'});
    //reset the form first for fresh upload
    $('#gvfupload_form')[0].reset();
    document.getElementById('gvfupload_form').style.visibility = 'visible';
    $('[class="ui-dialog-title"]').text('Variant File Upload');
}

function createProject() {
    var name = prompt("Please enter Project name");
    name = $.trim(name);
    if (name !='') {
        $.post('/test/index.php?id=34',{"action": "new project","name": name},
        function(data) {
            if (data) {
                alert("Project '" + name +"' has been added.");
                $('[name="project"]').append('<option value="'+data+'" selected="selected">'+name+'</option>');
            } else {
                alert('failed to add project');
            }
        });
    }
}

function comeBackLater() {
    alert("Come back later.");
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return "";
}

function updateVarViewGenes(glist) {
    $('#geneSearchBox:text').val(glist);
    updateList();
}

// generic dialog - only used by upload
function showDialog(type, msg, title) {
    var dlg = $("#dialog");
    dlg.html("");
    if(type == 'img') {
        msg = "<img src=\"" + msg + "\" />";
        dlg.html(msg);
    } else if(type == 'html') {
        var div = $('<div></div>');
        dlg.load(msg);
    }
    dlg.dialog({
        autoOpen: false,
        bigframe: true,
        modal: true,
        width: 'auto',
        height: 'auto',
        title: title,
        position: 'center'
    });
    dlg.dialog('open');
}

// show export dialog - not used
function showExportView() {
    var qvalues = getValues();
    var genomeId = getQueryVariable("genomeId");
    var dtitle = "Export Report for Genome: " + genomeId;
    var link = "/test/index.php?id=13&query=" + escape(qvalues);
    myref = window.open(link,dtitle);
}

// export variant list to excel
function exportToExcel() {
    var qvalues = getValues();
    var genomeId = getQueryVariable("genomeId");
    var dtitle = "Export Report for Genome: " + genomeId;
    window.location.href = "index.php?id=38&query=" + escape(qvalues);
}

// export variant list to excel
function exportVaastTrioToExcel() {
    var qvalues = getVaastTrioValues();
    window.location.href = "index.php?id=13&query=" + escape(qvalues);
}

function exportVaastQuadToExcel() {
    var qvalues = getVaastQuadValues();
    window.location.href = "index.php?id=61&query=" + escape(qvalues);
}

// show vaast variant miner
function showVariantMiner() {
    var genomeId = $('[name=genomeId]').attr('value');
    var projectId = $('[name=projectId]').attr('value');
    var reportId = $('[name=reportId]').attr('value');
    var vset = $('[name=vset]').attr('value');
    var pversion = $('[name=pversion]').attr('value');

    var dtitle = "Variant Mining Report for: " + genomeId;
    window.location.href = "index.php?id=11&reportId=" + reportId + "&genomeId=" + genomeId + "&projectId=" + projectId + "&vset=" + vset + "&pversion=" + pversion;
    window.document.title = dtitle;
}

// show vaast variant miner
function showVaastVariantMiner() {
    var genomeId = $('[name=genomeId]').attr('value');
    var projectId = $('[name=projectId]').attr('value');
    var reportId = $('[name=reportId]').attr('value');
    var vset = $('[name=vset]').attr('value');
    var annotversion = $('[name=annotversion]').attr('value');

    // we use a jquery selctor and a javascript object to get the set of genes from the page.
    // we rely on the fact that the genes are decorated by a <a> element with an href that contains
    // "showGeneView"
    //    var gene_set = {};
    //    $("td div a[href*=showGeneView]").each(function() {
    //                                                    gene_set[$(this).text()]=true;
    //                                                    });
    //    var gene_array = [];
    //    for(gene in gene_set) {
    //        gene_array.push(gene);
    //    }
    var variant_array = [];
    $("tr[id*=row]").each(function(index, item) {
        var $item = $(item);
        var id = $item.attr("id");
        variant_array.push(id.replace("row", ""));
    });

    var varid = variant_array.join(","); // comma is the default, but explicit is better than implicit.

    var dtitle = "Variant Mining Report for: " + genomeId;
    window.location.href = "index.php?id=11&reportId=" + reportId + "&genomeId=" + genomeId + "&projectId=" + projectId + "&vset=" + vset + "&pversion=" + annotversion + "&varid=" + varid;
    window.document.title = dtitle;
}

// show base trio report
function showFlexTrioReport(filter, mode, child, father, mother, project) {
    var dtitle = "Flex Trio Report for: " + child;
    window.location.href = "index.php?id=41&mode=" + mode + "&projectId=" + project + "&filter=" + filter + "&child=" + child + "&father=" + father + "&mother=" + mother;
}

// show base quad report
function showFlexQuadReport(filter, mode, child, sibling, father, mother, project, affected) {
    var dtitle = "Flex Quad Report for: " + child;
    window.location.href = "index.php?id=62&mode=" + mode + "&projectId=" + project + "&filter=" + filter + "&child=" + child + "&sibling=" + sibling + "&father=" + father + "&mother=" + mother + "&affected=" + affected;
}

// show variant difference report
function getDifferenceReport(genomeIds) {
    var background = genomeIds;
    var genomeId = getQueryVariable("genomeId");
    if (background != null && background != "") {
        var qvalues = getValues();
        var link = "index.php?id=18"; //&backg=" + background + "&query=" + escape(qvalues);
        var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
        .load(link, {"backg":background, "query":qvalues})
        .dialog({
            autoOpen: true,
            title: 'Variant Diff for: ' + genomeId,
            width: 420,
            height: 400,
            position: 'center'
        });
    }
}

// show variant intersetion report
function getIntersectionReport(genomeIds) {
    var background = genomeIds;
    var genomeId = getQueryVariable("genomeId");
    if (background != null && background != "") {
        var qvalues = getValues();
        var link = "index.php?id=19";//&backg=" + background + "&query=" + escape(qvalues);
        var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
        .load(link, {"backg":background, "query":qvalues})
        .dialog({
            autoOpen: true,
            title: 'Variant Intersect for: ' + genomeId,
            width: 420,
            height: 400,
            position: 'center'
        });
    }
}

// show gene difference report
function getFuzzyDifference(genomeIds) {
    var background = genomeIds;
    var genomeId = getQueryVariable("genomeId");
    if (background != null && background != "") {
        var qvalues = getValues();
        var link = "index.php?id=30&backg=" + background;// + "&query=" + escape(qvalues);
        var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
        .load(link, {"query":qvalues})
        .dialog({
            autoOpen: true,
            title: 'Gene Diff for: ' + genomeId,
            width: 255,
            height: 300,
            position: 'center'
        });
    }
}

// show gene intersection report
function getFuzzyIntersection(genomeIds) {
    var background = genomeIds;
    var genomeId = getQueryVariable("genomeId");
    if (background != null && background != "") {
        var qvalues = getValues();
        var link = "index.php?id=31&backg=" + background;// + "&query=" + escape(qvalues);
        var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
        .load(link, {"query":qvalues})
        .dialog({
            autoOpen: true,
            title: 'Gene Intersect for: ' + genomeId,
            width: 255,
            height: 300,
            position: 'center'
        });
    }
}

// show set operations dialog
function showSetOpsView() {
    var genomeId = getQueryVariable("genomeId");
    var projectId = getQueryVariable("projectId");
    var dtitle = "Set Operations on Genome: " + genomeId;
    var link = "index.php?id=28&projectId=" + projectId + "&genomeId=" + genomeId;
    var dialog = $('<div></div>')
    .load(link)
    .dialog({
        autoOpen: true,
        title: dtitle,
        width: 400,
        height: 'auto',
        resizable: false,
        modal: true,
        stack: true,
        position: 'center',
        close: function(ev, ui) { $(this).remove();}
    });
}

// show manager filters dialog
function showManageFilterView() {
    var link = "index.php?id=27";
    var dialog = $('<div></div>')
    .load(link)
    .dialog({
        autoOpen: true,
        title: 'Manage Filters',
        width: 370,
        height: 'auto',
        resizable: false,
        modal: true,
        stack: true,
        position: 'center',
        close: function(ev, ui) { $(this).remove();}
    });
}

// show gene information dialog
function showVariantLoad2() {
    var filter = getValues();
    var vset = getQueryVariable("vset");
    var genome = getQueryVariable("genomeId");
    var link = "index.php?id=42";
    var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
    .dialog({
        autoOpen: true,
        title: 'Variant Load for ' + genome,
        width: 'auto',
        height: 'auto',
        position: 'center',
        close: function(ev, ui) { $(this).remove();}
    }).load(link,{"vset":vset, "filter":filter});
}

// show variant load window
function showVariantLoad() {
    var filter = getValues();
    var vset = getQueryVariable("vset");
    var genome = getQueryVariable("genomeId");
    var dtitle = "Variant Load for Genome: " + genome;
    var url = "index.php?id=42&vset=" + vset + "&filter=" + filter;
    window.open (url,"vload");
}

// show vaast viewer window
function showVAASTViewer() {
    var polymode = "";
    var runid = getQueryVariable("run");
    var genome = getQueryVariable("genomeId");
    // var mode = $("input[name='mode']:checked").val();
    polyFilter = $("#vaastPolymorphic option:selected").attr('value');
    var dtitle = "VAAST Viewer for Genome: " + genome;
    if (polyFilter && polyFilter!= "NONE") {
        polymode = "&no_polymorphic=1";
    }
    var url = "index.php?id=60&score=1" + polymode + "&job_id=" + runid;
    window.open (url,"vaastviewer");
}

// show genome information dialog
function showVersionHistory() {
    var reportId =  $('[name=reportId]').attr('value');
    var link = "index.php?id=73&projectId=" + reportId;
    var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
    .load(link)
    .dialog({
        autoOpen: true,
        title: 'Report Versions',
        width: 650,
        height: 'auto',
        position: 'center',
        close: function(ev, ui) { $(this).remove();}
    });
}

// show gene information dialog
function showGeneView(gene, position, genomeId, vsetId) {
    var link = "index.php?id=25";
    var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
        .dialog({
            autoOpen: true,
            title: 'Gene Summary for ' + gene,
            width: 850,
            height: 'auto',
            position: 'center',
            close: function(ev, ui) { $(this).remove();}
        }).load(link,{"gene":gene, "genomeId":genomeId, "position":position, "vsetId":vsetId},
            function(e) {
                var $this = $(this);
                var container = $this.find(".gv-container");
                container.html('<div class="progress">Loading &hellip;</div>');
                var url = '/geneview/generated_data/' + gene + '.json';

                // instantiate geneview component
                var v =  new Omicia.GeneView({
                    url: url,
                    el: container
                });

                var unzoom = $this.find(".unzoom");
                unzoom.on('click', function(viewer) {
                    return function (e) {
                         viewer.zoom();
                    }}(v));

                var xhr = v.fetch({
                    success: function (container, viewer, variants) {
                        return function() {
                            var variant_track = getPersonalVariants(variants);
                            viewer.addTrack('variantsource', variant_track, 0);
                            container.on('geneview:variant:click', detailDialogClosure(container.next(".detail")));
                        }
                    }(container, v, $this.find("tr.variant")),
                    error: function(container) {
                        return function() {
                            container.html('<div class="progress">No Data</div>');
                        }
                    }(container)
                });
            }
        );
}

/*
    this is just a very hacky way to do this, for demo purposes. Needs to be translated to a full fledged dialog.
*/

function detailDialogClosure (dialog) {
    return function displayVariantDetail(ev, variants, el) {
        // wrap in array if needed
        if (!_.isArray(variants)) variants = [variants]

        // generate displayable stuff
        var labels = _.pluck(variants, 'id').join(', ');
        var s = JSON.stringify(variants, undefined, 2);

        el = $(el);

        // compute top/left of popup box
        var top = el.offset().top + parseInt(el.attr('height') || el.attr('y')) + 9; // +9 is for tail image
        var left = $(window).scrollLeft() + el.offset().left - ($('#detail').width() / 2) - 1;

        // populate popup and display

        var dialog_content = $("<div>");
        _.each(variants, function(variant) {
            var $variant = $("<table class='tbody'>")
                .append($("<caption class='theader'>").html(variant.label))
                .append($("<tbody>")
                    .append($("<tr>").append($("<td>").html("Change"))
                                     .append($("<td>").html(variant.change)))
                    .append($("<tr>").append($("<td>").html("Amino"))
                                     .append($("<td>").html(variant.amino)))
                    .append($("<tr>").append($("<td>").html("Region"))
                                     .append($("<td>").html(variant.region[0] + "-" + variant.region[1]))
                                     ));
                dialog_content.append($variant);
        });

        dialog
          .empty()
          .append(dialog_content).dialog({title: "Variant Detail",
            modal: true});
    }
}


/*
     extract the personal track from the dialog table

*/
function getPersonalVariants($element) {
    var personal_track = {
        label: "Personal",
        regions: [],
        variants: []
    };
    $element.each(function(index, item) {
        var $tr = $(item);
        var $region = $tr.find(".region");
        var variant_id = $region.attr('data-variant-id');
        var region = $region.text();
        var transcript = $tr.find(".transcript").text();
        var label = $tr.find(".label").text();
        var protein = $tr.find(".protein").text();
        var amino = $tr.find(".amino").text();
        var zygosity = $tr.find(".zygosity").text();
        var consequence = $tr.find(".consequence").text();
        personal_track.variants.push({id: variant_id,
           label: label,
           type: 1,
           change: label && label.substr(-3,3),
           amino: amino,
           region: [region, region],
           zygosity: zygosity,
           consequence: consequence
        })
    });
    var regions = {};
    $.each(personal_track.variants, function(index, variant) {
        var region = variant.region[0];
        regions[region] = regions[region] || [];
        regions[region].push(variant);
    });
    for(region in regions) {
        personal_track.regions.push({
            region: region,
            variants: regions[region]
        })
    }
    return personal_track;
}

// show genome information dialog
function showGenomeView(genomeId) {
    var link = "index.php?id=37&genomeId=" + genomeId;
    var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
    .load(link)
    .dialog({
        autoOpen: true,
        title: 'Genome Attributes for Genome ' + genomeId,
        width: 372,
        height: 'auto',
        position: 'center',
        close: function(ev, ui) { $(this).remove();}
    });
}

// test dialog - not used
function showTestDialog() {
    var dtitle = "Testing…";
    html = '<div>This test should be displayed in the dialog for fun.</div>'
    var dialog = $(html)
    .dialog({
        autoOpen: true,
        title: dtitle,
        width: 375,
        height: 'auto',
        resizable: false,
        modal: true,
        stack: true,
        position: 'center',
        close: function(ev, ui) { $(this).remove();}
    });
}

// show transcript information dialog - not used
function showTranscriptView(chrom, pos) {
    var genomeId = getQueryVariable("genomeId");
    var link = "index.php?id=32&chrom=" + chrom + "&pos=" + pos + "&genomeId=" + genomeId;
    var dialog = $('<div></div>')
    .load(link)
    .dialog({
        autoOpen: true,
        title: 'Alternate Transcripts at Postion ' + pos,
        width: 750,
        height: 'auto',
        position: 'center'
    });
}

// show manage sets dialog
function showManageSetDialog() {
    var projectId = getQueryVariable("projectId");
    var dtitle = "Manage Sets";
    var link = "index.php?id=35&projectId=" + projectId;
    var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
    .load(link)
    .dialog({
        autoOpen: true,
        title: dtitle,
        width: 375,
        height: 'auto',
        resizable: false,
        modal: true,
        stack: true,
        position: 'center',
        close: function(ev, ui) { $(this).remove();}
    });
}

// show edit set dialog
function showModifySetDialog(setId) {
    var dtitle = "Modify Gene Set";
    var link = "index.php?id=36&setId=" + setId;
    var dialog = $('<div id="modifyset"><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
    .load(link)
    .dialog({
        autoOpen: true,
        title: dtitle,
        width: 375,
        height: 'auto',
        resizable: false,
        modal: true,
        stack: true,
        position: 'center',
        open: function(ev, ui) { var height = $(window).height(); $("body").css('height', height);},
        close: function(ev, ui) { $(this).remove();}
    });
}

// show add set dialog
function showNewSetDialog() {
    var dtitle = "New Gene Set";
    var link = "index.php?id=36&setId=-1";
    var dialog = $('<div id="newset"><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
    .load(link)
    .dialog({
        autoOpen: true,
        title: dtitle,
        width: 375,
        height: 'auto',
        resizable: false,
        modal: true,
        stack: true,
        position: 'center',
        open: function(ev, ui) { var height = $(window).height(); $("body").css('height', height);},
        close: function(ev, ui) { $(this).remove();}
    });
}

// show manage projects dialog
function showManageProjectDialog() {
    var projectId = getQueryVariable("projectId");
    var dtitle = "Manage Project";
    var link = "index.php?id=33&projectId=" + projectId;
    var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
    .load(link)
    .dialog({
        autoOpen: true,
        title: dtitle,
        width: 375,
        height: 'auto',
        resizable: false,
        modal: true,
        stack: true,
        position: 'center',
        close: function(ev, ui) { $(this).remove();}
    });
}

// show interpret dialog
function showInterpretDialog() {
    var dtitle = "Interpret Module";
    var link = "index.php?id=59";
    var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
    .load(link)
    .dialog({
        autoOpen: true,
        title: dtitle,
        width: 550,
        height: 450,
        resizable: false,
        modal: true,
        stack: true,
        position: 'center',
        close: function(ev, ui) { $(this).remove();}
    });
}

// show flex report dialog
function showFlexDialog(mode) {
    if (mode == 1) {
        var dtitle = "Flex Trio Analysis";
        var link = "index.php?id=43";
    } else if (mode == 2) {
        var dtitle = "Flex Quad Analysis";
        var link = "index.php?id=63";
    }
    var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
    .load(link)
    .dialog({
        autoOpen: true,
        title: dtitle,
        width: 670,
        height: 'auto',
        resizable: false,
        modal: true,
        stack: true,
        position: 'center',
        close: function(ev, ui) { $(this).remove();}
    });
}

// show vaast report dialog
function showVAASTDialog(mode) {
    if (mode == 1) {
        var dtitle = "VAAST Trio Analysis";
        var link = "index.php?id=52";
    } else if (mode == 2) {
        var dtitle = "VAAST Quad Analysis";
        var link = "index.php?id=53";
    }
    var dialog = $('<div><img src="/test/assets/templates/genrep/images/indicator.gif" /></div>')
    .load(link)
    .dialog({
        autoOpen: true,
        title: dtitle,
        width: 670,
        height: 'auto',
        resizable: false,
        modal: true,
        stack: true,
        position: 'center',
        close: function(ev, ui) { $(this).remove();}
    });
}

// show add project dialog
function pmAddProject(name) {
    $.post('/test/index.php?id=34',{"action": 1,"name": name},
    function(data) {
        if(data) {
            alert("Project '" + name +"' has been added.");
            $('#projectList').append('<option value="'+data+'" selected="selected">'+name+'</option>');
        }
    });
}

// string utilities
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
}

String.prototype.rtrim = function() {
    return this.replace(/\s+$/,"");
}

function empty(mixed_var) {
    // *     example 1: empty(null);
    // *     returns 1: true
    // *     example 2: empty(undefined);
    // *     returns 2: true
    // *     example 3: empty([]);
    // *     returns 3: true
    // *     example 4: empty({});
    // *     returns 4: true
    // *     example 5: empty({'aFunc' : function () { alert('humpty'); } });
    // *     returns 5: false
    var key;
    if (mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false || typeof mixed_var === 'undefined') {
        return true;
    }
    if (typeof mixed_var == 'object') {
        for (key in mixed_var) {
            return false;
        }
        return true;
    }
    return false;
}