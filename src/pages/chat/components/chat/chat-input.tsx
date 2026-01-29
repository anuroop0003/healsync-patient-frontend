import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ArrowUp } from "lucide-react";

interface Props {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
}

const ChatInput = ({ input, setInput, onSend }: Props) => {
  return (
    <InputGroup className="overflow-hidden">
      <InputGroupTextarea
        placeholder="Ask, Search or Chat..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />

      <InputGroupAddon align="block-end">
        <InputGroupButton
          variant="outline"
          size="icon-sm"
          onClick={onSend}
          disabled={!input.trim()}
        >
          <ArrowUp />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default ChatInput;
