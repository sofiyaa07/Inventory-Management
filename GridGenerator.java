// i wrote this to automatically generate grids for the location sorting
// it has no use in the normal code, just here to help setup

public class GridGenerator {
    public static void main(String[] args) {
        
        for (int i = 1; i <= 6; i++) {
            for (int j = 1; j <= 5; j++) {
                System.out.println("<a href=\"indexMockup.html\" id=\""+(char)(j+64)+i+"\">\n\t"+(char)(j+64)+i+"\n</a>");
            }
        }

    }

}
