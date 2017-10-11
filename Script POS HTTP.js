var httpID = "1";
function Init()
{
    Core.RegisterEventHandler("HTTP_EVENT_PROXY",httpID,"PENDING_REQUEST","RESPONSE_TO_HTTP");
}


function RESPONSE_TO_HTTP(e)
{
	Log.Debug("Entra a metodo");
	if(e._path == "/terminalGet" || e._path == "/terminalPost" || e._path == "/terminalEnd")
	{
	   Log.Debug("Entra a condicion");
	   var identificador = e._id; 
	   var result;
	   var cantidadResultados = 0;
	   var response = "{\"Cameras\":[";
	   var Cnxn = new ActiveXObject("ADODB.Connection");
       var CnxnRecord = new ActiveXObject("ADODB.Recordset");
       var Connectext = "DATABASE=securos;DRIVER={PostgreSQL Unicode};PORT=5432;PWD=postgres;SERVER=127.0.0.1;UID=postgres;";
       var query="select \"cam_id\" from \"OBJ_POS_SERVER_CAM\" where \"parent_id\" = '" + e.idTerminal + "'";
	   Log.Debug(query);
		try
	   {
		       Cnxn.open(Connectext);
		       CnxnRecord.open(query,Cnxn);
		       CnxnRecord.MoveFirst;
			     while (!CnxnRecord.eof)
	          {
			           //Core.DoReact("POS_SERVER", "1", "RECEIPT_BEGIN", "receipt_id", identificador, "start_time", e.date + " " + e.time);
			           //Core.DoReact("POS_SERVER", "1", "SALE_DETECTED")
			          if(e._path == "/terminalEnd")
			             {
								Log.Debug("Terminal End");
				                 Core.DoReact("CAM",CnxnRecord.Fields("cam_id").Value, "CLEAR_SUBTITLES");
			              }else
			          if(e._path == "/terminalPost")
			             {
								Log.Debug("Terminal Post");
				            var banco = e.banco;
								var camaraID = e.camara;
								var fecha = e.date + " " + e.time;
								var cajeroID = e.cajero;
								var sello = e.sello;

								Core.DoReact("CAM",CnxnRecord.Fields("cam_id").Value, "ADD_SUBTITLES", "command", "<p>" + e.inputText + "</p><p>" + banco + " | " + camaraID + " | "  + cajeroID + " | " + sello + " | " + fecha);
								
			             }else
						{
							Log.Debug("Terminal Get");
						}
			                Log.Debug(CnxnRecord.Fields("cam_id").Value);
			          if(cantidadResultados > 0)
			             {
				                 response += ",";
			             }
			          cantidadResultados ++;
			          response += "\"" + CnxnRecord.Fields("cam_id").Value + "\"";
		            CnxnRecord.MoveNext;
		       }
		      response += "]}";	
		      Cnxn.Close();
	    }
	   catch(exception)
	    {
		      Log.Debug(exception);
		        response += "]}";
	    }	
	  Log.Debug("response: " + response);
	  Core.DoReact("HTTP_EVENT_PROXY",httpID,"RESPONSE","_id",identificador,"_body",response,"_content_type","application/json");

	}
	else
	{
		var respuesta = "{ \"error\": \"true\" }";
		//Log.Debug("response: " + respuesta);
		Core.DoReact("HTTP_EVENT_PROXY",httpID,"RESPONSE","_id",identificador,"_body",response,"_content_type","application/json");

	}
		
}