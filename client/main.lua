ESX              = nil
local firstSpawn = true
local id         = 0
local name       = nil
local gang_data  = nil
local job_data   = nil
local ha_data    = nil
local cash       = 0
local bank       = 0
local toggle     = false
local useshowcmd = false

Citizen.CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        Citizen.Wait(0)
    end
end)

AddEventHandler('playerSpawned', function()
   if firstSpawn then
    ShowStatus(true)
    firstSpawn = false
   end
end)

RegisterNetEvent('esx_customui:updateStatus')
AddEventHandler('esx_customui:updateStatus', function(status)
	SendNUIMessage({HUDStatus = true, statusdata = status})
end)

RegisterNetEvent('status:setClientData')
AddEventHandler('status:setClientData', function (getdata)
    local PED = PlayerPedId()
    id = getdata.id
    name = getdata.name
    gang_data = getdata.gang
    job_data =  getdata.job
    ha_data = {health = GetEntityHealth(PED) - 100, armor = GetPedArmour(PED)}
    cash = getdata.cash
    bank = getdata.bank
    Wait(100)
    SendNUIMessage({IDHUD = true , idplayer = id})
    SendNUIMessage({PlayerNamee = true , Pname = name})
    SendNUIMessage({SeteventGang = true , Gdata = gang_data})
    SendNUIMessage({SetJob = true , Jdata = job_data})
    SendNUIMessage({Setovdata = true , ovdata = ha_data})
    SendNUIMessage({SetPCash = true , cash = cash})
    SendNUIMessage({SetPBank = true , bank = bank})
end)


Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)
        if IsPauseMenuActive() and not useshowcmd then
            ShowStatus(false)
            Citizen.Wait(500)
        else
            ShowStatus(true)
        end
        TriggerServerEvent('status:setData')
        Citizen.Wait(0)
    end
end)


-- RegisterCommand('togglehud', function()
--     if toggle then
--         ToggleHud(false)
--     else
--         ToggleHud(true)
--     end
-- end)


function ToggleHud(status)
    toggle = status
    if status == true then
        SendNUIMessage({HUDToggle = true, hudToggleStatus = true})
    elseif status == false then
        SendNUIMessage({HUDToggle = true, hudToggleStatus = false})
    end
end

function ShowStatus(status)
    show = status
    if status then
        SendNUIMessage({onstatus = true})
    else
        SendNUIMessage({offstatus = true})
    end
end

function SetHudOpacity(status)
    SendNUIMessage({SetHudOpacity = true, opacityHUD = status})
end