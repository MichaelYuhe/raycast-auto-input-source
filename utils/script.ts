export const SWITCH_INPUT_METHOD_SCRIPT = `
on run argv
    -- Check if argument is provided
    if (count of argv) is 0 then
        return "Error: Please provide an input source name"
    end if
    
    set targetSource to item 1 of argv
    
    tell application "System Events"
        -- Get all input sources
        tell process "SystemUIServer"
            set menuItems to menu bar items of menu bar 1
            repeat with menuItem in menuItems
                if description of menuItem contains "input" then
                    -- Found the input menu
                    set inputMenu to menuItem
                    click inputMenu
                    
                    -- Get all input sources from the menu
                    set menuItemsList to name of menu items of menu 1 of inputMenu
                    
                    -- Try to find and switch to the target input source
                    repeat with itemName in menuItemsList
                        if itemName contains targetSource then
                            try
                                click menu item itemName of menu 1 of inputMenu
                                return "Successfully switched to " & itemName
                            on error errMsg
                                return "Error switching to " & itemName & ": " & errMsg
                            end try
                            exit repeat
                        end if
                    end repeat
                    
                    -- If we get here, the input source wasn't found
                    return "Error: Input source '" & targetSource & "' not found. Available options: " & menuItemsList as string
                end if
            end repeat
        end tell
    end tell
    
    return "Error: Could not find input source menu"
end run
`;

export const GET_ACTIVE_APP_SCRIPT = `
tell application "System Events"
    set frontProcess to first application process whose frontmost is true
    set frontApp to bundle identifier of frontProcess
    return frontApp
end tell
`;
