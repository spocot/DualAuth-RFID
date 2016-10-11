import java.awt.Robot;
import java.awt.event.KeyEvent;

public class Main {
	
	public static void main(String[] args) throws Exception{
		Robot r = new Robot();
		writeString(r, args[0].substring(0,args[0].indexOf('.')));
		//Thread.sleep(50);
		r.keyPress(KeyEvent.VK_ENTER);
		r.keyRelease(KeyEvent.VK_ENTER);
		Thread.sleep(1000);
		r.keyPress(KeyEvent.VK_ENTER);
		r.keyRelease(KeyEvent.VK_ENTER);
	}
	
	private static void writeString(Robot robot, String s) {
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);
			if (Character.isUpperCase(c)) {
				robot.keyPress(KeyEvent.VK_SHIFT);
			}
			robot.keyPress(Character.toUpperCase(c));
			robot.keyRelease(Character.toUpperCase(c));

			if (Character.isUpperCase(c)) {
				robot.keyRelease(KeyEvent.VK_SHIFT);
			}
		}
	}
}	
