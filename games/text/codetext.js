

// Choose accent mode. If true, then accent must be correct. If false, accents won't matter. 
var accentMode = true

// The correct answer to be found
var titleList = ["MongoDB", "Inheritance", "Pascal", "Linux", "Javascript"];
var textList = [`MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License (SSPL) which is deemed non-free by several distributions. MongoDB is a member of the MACH Alliance.`,

  `In object-oriented programming, inheritance is the mechanism of basing an object or class upon another object (prototype-based inheritance) or class (class-based inheritance), retaining similar implementation. Also defined as deriving new classes (sub classes) from existing ones such as super class or base class and then forming them into a hierarchy of classes. In most class-based object-oriented languages, an object created through inheritance, a 'child object', acquires all the properties and behaviors of the 'parent object' , with the exception of: constructors, destructors, overloaded operators and friend functions of the base class. Inheritance allows programmers to create classes that are built upon existing classes, to specify a new implementation while maintaining the same behaviors (realizing an interface), to reuse code and to independently extend original software via public classes and interfaces. The relationships of objects or classes through inheritance give rise to a directed acyclic graph.`,

  `Pascal is an imperative and procedural programming language, designed by Niklaus Wirth as a small, efficient language intended to encourage good programming practices using structured programming and data structuring. It is named in honour of the French mathematician, philosopher and physicist Blaise Pascal. Pascal was developed on the pattern of the ALGOL 60 language. Wirth was involved in the process to improve the language as part of the ALGOL X efforts and proposed a version named ALGOL W. This was not accepted, and the ALGOL X process bogged down. In 1968, Wirth decided to abandon the ALGOL X process and further improve ALGOL W, releasing this as Pascal in 1970. On top of ALGOL's scalars and arrays, Pascal enables defining complex datatypes and building dynamic and recursive data structures such as lists, trees and graphs. Pascal has strong typing on all objects, which means that one type of data cannot be converted to or interpreted as another without explicit conversions. Unlike C (and most languages in the C-family), Pascal allows nested procedure definitions to any level of depth, and also allows most kinds of definitions and declarations inside subroutines (procedures and functions). A program is thus syntactically similar to a single procedure or function. This is similar to the block structure of ALGOL 60, but restricted from arbitrary block statements to just procedures and functions. Pascal became very successful in the 1970s, notably on the burgeoning minicomputer market. Compilers were also available for many microcomputers as the field emerged in the late 1970s. It was widely used as a teaching language in university-level programming courses in the 1980s, and also used in production settings for writing commercial software during the same period. It was displaced by the C programming language during the late 1980s and early 1990s as UNIX-based systems became popular, and especially with the release of C++. A derivative named Object Pascal designed for object-oriented programming was developed in 1985. This was used by Apple Computer (for the Lisa and Macintosh machines) and Borland in the late 1980s and later developed into Delphi on the Microsoft Windows platform. Extensions to the Pascal concepts led to the languages Modula-2 and Oberon.`,

  `is a family of open-source Unix-like operating systems based on the Linux kernel, an operating system kernel first released on September 17, 1991, by Linus Torvalds. Linux is typically packaged as a Linux distribution, which includes the kernel and supporting system software and libraries, many of which are provided by the GNU Project. Many Linux distributions use the word 'Linux' in their name, but the Free Software Foundation uses the name 'GNU/Linux' to emphasize the importance of GNU software, causing some controversy. Popular Linux distributions include Debian, Fedora Linux, and Ubuntu, the latter of which itself consists of many different distributions and modifications, including Lubuntu and Xubuntu. Commercial distributions include Red Hat Enterprise Linux and SUSE Linux Enterprise. Desktop Linux distributions include a windowing system such  X11 or Wayland, and a desktop environment such as GNOME or KDE Plasma. Distributions intended for servers may omit graphics altogether, or include a solution stack such as LAMP. Because Linux is freely redistributable, anyone may create a distribution for any purpose.Linux was originally developed for personal computers based on the Intel x86 architecture, but has since been ported to more platforms than any other operating system. Because of the dominance of the Linux-based Android on smartphones, Linux, including Android, has the largest installed base of all general-purpose operating systems, as of May 2022. Although Linux is, as of November 2022, used by only around 2.6 percent of desktop computers, the Chromebook, which runs the Linux kernel-based ChromeOS, dominates the US K-12 education market and represents nearly 20 percent of sub-$300 notebook sales in the US. Linux is the leading operating system on servers (over 96.4% of the top 1 million web servers' operating systems are Linux), leads other big iron systems such as mainframe computers, and is used on all of the world's 500 fastest supercomputers (since November 2017, having gradually displaced all competitors). Linux also runs on embedded systems, i.e. devices whose operating system is typically built into the firmware and is highly tailored to the system. `,

  `JavaScript, often abbreviated as JS, is a programming language Steve Wozniak that is one of the core technologies of the World C Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices. JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.[10] It has dynamic typing, prototype-based object-orientation, and first-class functions. It is multi-paradigm, supporting event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM).The ECMAScript standard does not include any input/output (I/O), such as networking, storage, or graphics facilities. In practice, the web browser or other runtime system provides JavaScript APIs for I/O.JavaScript engines were originally used only in web browsers, but are now core components of some servers and a variety of applications. The most popular runtime system for this usage is Node.js.Although Java and JavaScript are similar in name, syntax, and respective standard libraries, the two languages are distinct and differ greatly in design.`];

var answer = getRandomTitle()
function getRandomTitle() {
  var randomIndex = Math.floor(Math.random() * titleList.length);
  return titleList[randomIndex];
}
function getTextForTitle(answer) {
  var index = titleList.indexOf(answer);
  if (index !== -1) {
    return textList[index];
  }
  return "";
}

function onPageLoad() {
  var answer = getRandomTitle();
  var textoOriginal = getTextForTitle(answer);
  console.log(answer); // Exibe o título no console (opcional)
  // Faça o que você quiser com a variável 'answer' aqui, por exemplo, atribuir ao elemento de um elemento HTML:
  var answerElement = document.getElementById("answer");
  var textElement = document.getElementById("textoOriginal");
  answerElement.innerHTML = answer;
  textElement.innerHTML = answer;
}


// Here are the words that will be displayed at the beginning 
var whitelist = ["often ", "as", "is", "a", "that", "is", "of", "the", "of", "along", "and", "As", "use", "on", "the", "for", "often", "All", "have", "a", "to", "the", "on", "is", "a", "often", "in", "that", "to", "the", "has", "and", "and", "has", "for", "with", "and", "the", "The", "does", "not", "any", "such", "as", "or", "the", "or", "other", "for", "were", "only", "in", "but", "are", "now", "of", "some", "and", "a", "of", "The", "most", "for", "this", "is", "Although", "and", "are", "in", "and", "the", "are", "and", "in"]

// Text to be displayed below the answer/title
var textoOriginal = getTextForTitle(answer); /*`
JavaScript, often abbreviated as JS, is a programming language Steve Wozniak that is one of the core technologies of the World C Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices. JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.[10] It has dynamic typing, prototype-based object-orientation, and first-class functions. It is multi-paradigm, supporting event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM).The ECMAScript standard does not include any input/output (I/O), such as networking, storage, or graphics facilities. In practice, the web browser or other runtime system provides JavaScript APIs for I/O.JavaScript engines were originally used only in web browsers, but are now core components of some servers and a variety of applications. The most popular runtime system for this usage is Node.js.Although Java and JavaScript are similar in name, syntax, and respective standard libraries, the two languages are distinct and differ greatly in design.
`*/
console.log(answer)
console.log(getTextForTitle(answer))
console.log(textoOriginal)
function openNav() {
  document.getElementById("myNav").style.width = '45%'
}
function closeNav() {
  document.getElementById("myNav").style.width = '0%'
}

