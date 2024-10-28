export const SWITCH_INPUT_METHOD_SCRIPT = `
on run argv
    -- Check if argument is provided
    if (count of argv) is 0 then
        return "Error: Please provide an input source name (e.g., 'ABC' or '简体拼音')"
    end if
    
    set targetSource to item 1 of argv
    
    -- Define known input sources
    set knownSources to {"ABC", "简体拼音", "繁體拼音", "日本語", "한국어"}
    
    -- Validate input source
    set sourceExists to false
    repeat with sourceItem in knownSources
        if sourceItem as string is equal to targetSource then
            set sourceExists to true
            exit repeat
        end if
    end repeat
    
    if not sourceExists then
        return "Error: Unknown input source. Available options: " & knownSources as string
    end if
    
    -- Try to switch to the specified input source
    try
        tell application "System Events"
            tell process "TextInputMenuAgent"
                click menu item targetSource of menu 1 of menu bar item 1 of menu bar 1
            end tell
        end tell
        return "Successfully switched to " & targetSource
    on error errMsg
        return "Error switching input source: " & errMsg
    end try
end run
`;

export const GET_ACTIVE_APP_SCRIPT = `
tell application "System Events"
    set frontProcess to first application process whose frontmost is true
    set frontApp to bundle identifier of frontProcess
    return frontApp
end tell
`;
