ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)


RegisterNetEvent('status:setData')
AddEventHandler('status:setData', function ()
    local src = source
    if tonumber(src) then
        local xPlayer = ESX.GetPlayerFromId(tonumber(src))
        if xPlayer ~= nil then
            local data = {
                job  = xPlayer,
                gang = xPlayer,
                cash = xPlayer.money,
                bank = xPlayer.bank,
                id   = tonumber(src),
                name = string.gsub(xPlayer.name , "_"," ")
            }
            TriggerClientEvent('status:setClientData', tonumber(src), data)
        end
    end
end)