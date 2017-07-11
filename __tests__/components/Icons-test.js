// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import ThreeDIcon from '../../src/js/components/icons/base/3d';
import AccessAccessibilityIcon from '../../src/js/components/icons/base/AccessAccessibility';
import AccessAdIcon from '../../src/js/components/icons/base/AccessAd';
import AccessAssistListeningIcon from '../../src/js/components/icons/base/AccessAssistListening';
import AccessBrailleIcon from '../../src/js/components/icons/base/AccessBraille';
import AccessSignIcon from '../../src/js/components/icons/base/AccessSign';
import AccessTtyIcon from '../../src/js/components/icons/base/AccessTty';
import AccessVolumeControlIcon from '../../src/js/components/icons/base/AccessVolumeControl';
import AccessWheelchairActiveIcon from '../../src/js/components/icons/base/AccessWheelchairActive';
import AccessWheelchairIcon from '../../src/js/components/icons/base/AccessWheelchair';
import AccessibleIcon from '../../src/js/components/icons/base/Accessible';
import AchievementIcon from '../../src/js/components/icons/base/Achievement';
import ActionIcon from '../../src/js/components/icons/base/Action';
import ActionsIcon from '../../src/js/components/icons/base/Actions';
import AddChapterIcon from '../../src/js/components/icons/base/AddChapter';
import AddCircleIcon from '../../src/js/components/icons/base/AddCircle';
import AddIcon from '../../src/js/components/icons/base/Add';
import AedIcon from '../../src/js/components/icons/base/Aed';
import AggregateIcon from '../../src/js/components/icons/base/Aggregate';
import AidOptionIcon from '../../src/js/components/icons/base/AidOption';
import AidIcon from '../../src/js/components/icons/base/Aid';
import AlarmIcon from '../../src/js/components/icons/base/Alarm';
import AlertIcon from '../../src/js/components/icons/base/Alert';
import AnalyticsIcon from '../../src/js/components/icons/base/Analytics';
import AnnounceIcon from '../../src/js/components/icons/base/Announce';
import AppsIcon from '../../src/js/components/icons/base/Apps';
import ArchiveIcon from '../../src/js/components/icons/base/Archive';
import ArticleIcon from '../../src/js/components/icons/base/Article';
import AscendIcon from '../../src/js/components/icons/base/Ascend';
import AtmIcon from '../../src/js/components/icons/base/Atm';
import AttachmentIcon from '../../src/js/components/icons/base/Attachment';
import AttractionIcon from '../../src/js/components/icons/base/Attraction';
import BabyIcon from '../../src/js/components/icons/base/Baby';
import BackTenIcon from '../../src/js/components/icons/base/BackTen';
import BarChartIcon from '../../src/js/components/icons/base/BarChart';
import BarIcon from '../../src/js/components/icons/base/Bar';
import BasketIcon from '../../src/js/components/icons/base/Basket';
import BlogIcon from '../../src/js/components/icons/base/Blog';
import BookIcon from '../../src/js/components/icons/base/Book';
import BookmarkIcon from '../../src/js/components/icons/base/Bookmark';
import BottomCornerIcon from '../../src/js/components/icons/base/BottomCorner';
import BrandAppleAppStoreIcon from '../../src/js/components/icons/base/BrandAppleAppStore';
import BrandCodepenEditIcon from '../../src/js/components/icons/base/BrandCodepenEdit';
import BrandCodepenTryIcon from '../../src/js/components/icons/base/BrandCodepenTry';
import BrandGooglePlayIcon from '../../src/js/components/icons/base/BrandGooglePlay';
import BrandGrommetOutlineIcon from '../../src/js/components/icons/base/BrandGrommetOutline';
import BrandGrommetPathIcon from '../../src/js/components/icons/base/BrandGrommetPath';
import BrandHpeElementOutlineIcon from '../../src/js/components/icons/base/BrandHpeElementOutline';
import BrandHpeElementPathIcon from '../../src/js/components/icons/base/BrandHpeElementPath';
import BrandHpeLabsInsigniaOutlineIcon from '../../src/js/components/icons/base/BrandHpeLabsInsigniaOutline';
import BrandHpeLabsInsigniaIcon from '../../src/js/components/icons/base/BrandHpeLabsInsignia';
import BrandHpeStackCenteredIcon from '../../src/js/components/icons/base/BrandHpeStackCentered';
import BrandHpeStackIcon from '../../src/js/components/icons/base/BrandHpeStack';
import BriefcaseIcon from '../../src/js/components/icons/base/Briefcase';
import BrushIcon from '../../src/js/components/icons/base/Brush';
import BugIcon from '../../src/js/components/icons/base/Bug';
import BundleIcon from '../../src/js/components/icons/base/Bundle';
import BusIcon from '../../src/js/components/icons/base/Bus';
import BusinessServiceIcon from '../../src/js/components/icons/base/BusinessService';
import CafeteriaIcon from '../../src/js/components/icons/base/Cafeteria';
import CalculatorIcon from '../../src/js/components/icons/base/Calculator';
import CalendarIcon from '../../src/js/components/icons/base/Calendar';
import CameraIcon from '../../src/js/components/icons/base/Camera';
import CapacityIcon from '../../src/js/components/icons/base/Capacity';
import CarIcon from '../../src/js/components/icons/base/Car';
import CaretBackIcon from '../../src/js/components/icons/base/CaretBack';
import CaretDownIcon from '../../src/js/components/icons/base/CaretDown';
import CaretNextIcon from '../../src/js/components/icons/base/CaretNext';
import CaretPreviousIcon from '../../src/js/components/icons/base/CaretPrevious';
import CaretUpIcon from '../../src/js/components/icons/base/CaretUp';
import CartIcon from '../../src/js/components/icons/base/Cart';
import CatalogOptionIcon from '../../src/js/components/icons/base/CatalogOption';
import CatalogIcon from '../../src/js/components/icons/base/Catalog';
import ChannelIcon from '../../src/js/components/icons/base/Channel';
import ChapterAddIcon from '../../src/js/components/icons/base/ChapterAdd';
import ChapterNextIcon from '../../src/js/components/icons/base/ChapterNext';
import ChapterPreviousIcon from '../../src/js/components/icons/base/ChapterPrevious';
import ChatIcon from '../../src/js/components/icons/base/Chat';
import CheckboxSelectedIcon from '../../src/js/components/icons/base/CheckboxSelected';
import CheckboxIcon from '../../src/js/components/icons/base/Checkbox';
import CheckmarkIcon from '../../src/js/components/icons/base/Checkmark';
import CircleInformationIcon from '../../src/js/components/icons/base/CircleInformation';
import CirclePlayIcon from '../../src/js/components/icons/base/CirclePlay';
import CircleQuestionIcon from '../../src/js/components/icons/base/CircleQuestion';
import ClearOptionIcon from '../../src/js/components/icons/base/ClearOption';
import ClearIcon from '../../src/js/components/icons/base/Clear';
import CliIcon from '../../src/js/components/icons/base/Cli';
import ClipboardIcon from '../../src/js/components/icons/base/Clipboard';
import ClockIcon from '../../src/js/components/icons/base/Clock';
import CloneIcon from '../../src/js/components/icons/base/Clone';
import CloseIcon from '../../src/js/components/icons/base/Close';
import ClosedCaptionIcon from '../../src/js/components/icons/base/ClosedCaption';
import CloudComputerIcon from '../../src/js/components/icons/base/CloudComputer';
import CloudDownloadIcon from '../../src/js/components/icons/base/CloudDownload';
import CloudSoftwareIcon from '../../src/js/components/icons/base/CloudSoftware';
import CloudUploadIcon from '../../src/js/components/icons/base/CloudUpload';
import CloudIcon from '../../src/js/components/icons/base/Cloud';
import ClusterIcon from '../../src/js/components/icons/base/Cluster';
import CoatCheckIcon from '../../src/js/components/icons/base/CoatCheck';
import CodeIcon from '../../src/js/components/icons/base/Code';
import ColumnsIcon from '../../src/js/components/icons/base/Columns';
import CompareIcon from '../../src/js/components/icons/base/Compare';
import CompassIcon from '../../src/js/components/icons/base/Compass';
import ComplianceIcon from '../../src/js/components/icons/base/Compliance';
import ConfigureIcon from '../../src/js/components/icons/base/Configure';
import ConnectIcon from '../../src/js/components/icons/base/Connect';
import ContactInfoIcon from '../../src/js/components/icons/base/ContactInfo';
import ContactIcon from '../../src/js/components/icons/base/Contact';
import ContractIcon from '../../src/js/components/icons/base/Contract';
import CopyIcon from '../../src/js/components/icons/base/Copy';
import CreditCardIcon from '../../src/js/components/icons/base/CreditCard';
import CubeIcon from '../../src/js/components/icons/base/Cube';
import CubesIcon from '../../src/js/components/icons/base/Cubes';
import CurrencyIcon from '../../src/js/components/icons/base/Currency';
import CursorIcon from '../../src/js/components/icons/base/Cursor';
import CutIcon from '../../src/js/components/icons/base/Cut';
import CycleIcon from '../../src/js/components/icons/base/Cycle';
import DashboardIcon from '../../src/js/components/icons/base/Dashboard';
import DatabaseIcon from '../../src/js/components/icons/base/Database';
import DeliverIcon from '../../src/js/components/icons/base/Deliver';
import DeployIcon from '../../src/js/components/icons/base/Deploy';
import DescendIcon from '../../src/js/components/icons/base/Descend';
import DesktopIcon from '../../src/js/components/icons/base/Desktop';
import DetachIcon from '../../src/js/components/icons/base/Detach';
import DiamondIcon from '../../src/js/components/icons/base/Diamond';
import DirectionsIcon from '../../src/js/components/icons/base/Directions';
import DislikeIcon from '../../src/js/components/icons/base/Dislike';
import DocumentCloudIcon from '../../src/js/components/icons/base/DocumentCloud';
import DocumentConfigIcon from '../../src/js/components/icons/base/DocumentConfig';
import DocumentCsvIcon from '../../src/js/components/icons/base/DocumentCsv';
import DocumentDownloadIcon from '../../src/js/components/icons/base/DocumentDownload';
import DocumentExcelIcon from '../../src/js/components/icons/base/DocumentExcel';
import DocumentExeIcon from '../../src/js/components/icons/base/DocumentExe';
import DocumentImageIcon from '../../src/js/components/icons/base/DocumentImage';
import DocumentLockedIcon from '../../src/js/components/icons/base/DocumentLocked';
import DocumentMissingIcon from '../../src/js/components/icons/base/DocumentMissing';
import DocumentNotesIcon from '../../src/js/components/icons/base/DocumentNotes';
import DocumentOutlookIcon from '../../src/js/components/icons/base/DocumentOutlook';
import DocumentPdfIcon from '../../src/js/components/icons/base/DocumentPdf';
import DocumentPerformanceIcon from '../../src/js/components/icons/base/DocumentPerformance';
import DocumentPptIcon from '../../src/js/components/icons/base/DocumentPpt';
import DocumentRtfIcon from '../../src/js/components/icons/base/DocumentRtf';
import DocumentSoundIcon from '../../src/js/components/icons/base/DocumentSound';
import DocumentStoreIcon from '../../src/js/components/icons/base/DocumentStore';
import DocumentTestIcon from '../../src/js/components/icons/base/DocumentTest';
import DocumentTextIcon from '../../src/js/components/icons/base/DocumentText';
import DocumentThreatIcon from '../../src/js/components/icons/base/DocumentThreat';
import DocumentTimeIcon from '../../src/js/components/icons/base/DocumentTime';
import DocumentTransferIcon from '../../src/js/components/icons/base/DocumentTransfer';
import DocumentTxtIcon from '../../src/js/components/icons/base/DocumentTxt';
import DocumentUpdateIcon from '../../src/js/components/icons/base/DocumentUpdate';
import DocumentUploadIcon from '../../src/js/components/icons/base/DocumentUpload';
import DocumentUserIcon from '../../src/js/components/icons/base/DocumentUser';
import DocumentVerifiedIcon from '../../src/js/components/icons/base/DocumentVerified';
import DocumentVideoIcon from '../../src/js/components/icons/base/DocumentVideo';
import DocumentWindowsIcon from '../../src/js/components/icons/base/DocumentWindows';
import DocumentWordIcon from '../../src/js/components/icons/base/DocumentWord';
import DocumentZipIcon from '../../src/js/components/icons/base/DocumentZip';
import DocumentIcon from '../../src/js/components/icons/base/Document';
import DomainIcon from '../../src/js/components/icons/base/Domain';
import DownIcon from '../../src/js/components/icons/base/Down';
import DownloadIcon from '../../src/js/components/icons/base/Download';
import DragIcon from '../../src/js/components/icons/base/Drag';
import DriveCageIcon from '../../src/js/components/icons/base/DriveCage';
import DuplicateIcon from '../../src/js/components/icons/base/Duplicate';
import EditIcon from '../../src/js/components/icons/base/Edit';
import EjectIcon from '../../src/js/components/icons/base/Eject';
import ElevatorIcon from '../../src/js/components/icons/base/Elevator';
import EmergencyIcon from '../../src/js/components/icons/base/Emergency';
import EmptyCircleIcon from '../../src/js/components/icons/base/EmptyCircle';
import EscalatorIcon from '../../src/js/components/icons/base/Escalator';
import ExpandIcon from '../../src/js/components/icons/base/Expand';
import FanIcon from '../../src/js/components/icons/base/Fan';
import FastForwardIcon from '../../src/js/components/icons/base/FastForward';
import FavoriteIcon from '../../src/js/components/icons/base/Favorite';
import FilterIcon from '../../src/js/components/icons/base/Filter';
import FingerPrintIcon from '../../src/js/components/icons/base/FingerPrint';
import FlagIcon from '../../src/js/components/icons/base/Flag';
import FolderCycleIcon from '../../src/js/components/icons/base/FolderCycle';
import FolderOpenIcon from '../../src/js/components/icons/base/FolderOpen';
import FolderIcon from '../../src/js/components/icons/base/Folder';
import FormAddIcon from '../../src/js/components/icons/base/FormAdd';
import FormAttachmentIcon from '../../src/js/components/icons/base/FormAttachment';
import FormCalendarIcon from '../../src/js/components/icons/base/FormCalendar';
import FormCheckmarkIcon from '../../src/js/components/icons/base/FormCheckmark';
import FormClockIcon from '../../src/js/components/icons/base/FormClock';
import FormCloseIcon from '../../src/js/components/icons/base/FormClose';
import FormCutIcon from '../../src/js/components/icons/base/FormCut';
import FormDownIcon from '../../src/js/components/icons/base/FormDown';
import FormEditIcon from '../../src/js/components/icons/base/FormEdit';
import FormFilterIcon from '../../src/js/components/icons/base/FormFilter';
import FormFolderIcon from '../../src/js/components/icons/base/FormFolder';
import FormLocationIcon from '../../src/js/components/icons/base/FormLocation';
import FormLockIcon from '../../src/js/components/icons/base/FormLock';
import FormNextLinkIcon from '../../src/js/components/icons/base/FormNextLink';
import FormNextIcon from '../../src/js/components/icons/base/FormNext';
import FormPreviousLinkIcon from '../../src/js/components/icons/base/FormPreviousLink';
import FormPreviousIcon from '../../src/js/components/icons/base/FormPrevious';
import FormRefreshIcon from '../../src/js/components/icons/base/FormRefresh';
import FormScheduleIcon from '../../src/js/components/icons/base/FormSchedule';
import FormSearchIcon from '../../src/js/components/icons/base/FormSearch';
import FormSubtractIcon from '../../src/js/components/icons/base/FormSubtract';
import FormTrashIcon from '../../src/js/components/icons/base/FormTrash';
import FormUpIcon from '../../src/js/components/icons/base/FormUp';
import FormUploadIcon from '../../src/js/components/icons/base/FormUpload';
import ForwardTenIcon from '../../src/js/components/icons/base/ForwardTen';
import GalleryIcon from '../../src/js/components/icons/base/Gallery';
import GamepadIcon from '../../src/js/components/icons/base/Gamepad';
import GiftIcon from '../../src/js/components/icons/base/Gift';
import GlobeIcon from '../../src/js/components/icons/base/Globe';
import GridIcon from '../../src/js/components/icons/base/Grid';
import GroupIcon from '../../src/js/components/icons/base/Group';
import GrowIcon from '../../src/js/components/icons/base/Grow';
import HaltIcon from '../../src/js/components/icons/base/Halt';
import HelpIcon from '../../src/js/components/icons/base/Help';
import HistoryIcon from '../../src/js/components/icons/base/History';
import HomeIcon from '../../src/js/components/icons/base/Home';
import HostMaintenanceIcon from '../../src/js/components/icons/base/HostMaintenance';
import HostIcon from '../../src/js/components/icons/base/Host';
import IceCreamIcon from '../../src/js/components/icons/base/IceCream';
import ImageIcon from '../../src/js/components/icons/base/Image';
import ImpactIcon from '../../src/js/components/icons/base/Impact';
import InProgressIcon from '../../src/js/components/icons/base/InProgress';
import InboxIcon from '../../src/js/components/icons/base/Inbox';
import IndicatorIcon from '../../src/js/components/icons/base/Indicator';
import InfoIcon from '../../src/js/components/icons/base/Info';
import InheritIcon from '../../src/js/components/icons/base/Inherit';
import InspectIcon from '../../src/js/components/icons/base/Inspect';
import InstallOptionIcon from '../../src/js/components/icons/base/InstallOption';
import InstallIcon from '../../src/js/components/icons/base/Install';
import IntegrationIcon from '../../src/js/components/icons/base/Integration';
import IterationIcon from '../../src/js/components/icons/base/Iteration';
import JavaIcon from '../../src/js/components/icons/base/Java';
import LanguageIcon from '../../src/js/components/icons/base/Language';
import LaunchIcon from '../../src/js/components/icons/base/Launch';
import LayerIcon from '../../src/js/components/icons/base/Layer';
import LicenseIcon from '../../src/js/components/icons/base/License';
import LikeIcon from '../../src/js/components/icons/base/Like';
import LineChartIcon from '../../src/js/components/icons/base/LineChart';
import LinkBottomIcon from '../../src/js/components/icons/base/LinkBottom';
import LinkDownIcon from '../../src/js/components/icons/base/LinkDown';
import LinkNextIcon from '../../src/js/components/icons/base/LinkNext';
import LinkPreviousIcon from '../../src/js/components/icons/base/LinkPrevious';
import LinkTopIcon from '../../src/js/components/icons/base/LinkTop';
import LinkUpIcon from '../../src/js/components/icons/base/LinkUp';
import LinkIcon from '../../src/js/components/icons/base/Link';
import LocalIcon from '../../src/js/components/icons/base/Local';
import LocationPinIcon from '../../src/js/components/icons/base/LocationPin';
import LocationIcon from '../../src/js/components/icons/base/Location';
import LockIcon from '../../src/js/components/icons/base/Lock';
import LoginIcon from '../../src/js/components/icons/base/Login';
import LogoutIcon from '../../src/js/components/icons/base/Logout';
import LoungeIcon from '../../src/js/components/icons/base/Lounge';
import MagicIcon from '../../src/js/components/icons/base/Magic';
import MailOptionIcon from '../../src/js/components/icons/base/MailOption';
import MailIcon from '../../src/js/components/icons/base/Mail';
import ManualIcon from '../../src/js/components/icons/base/Manual';
import MapLocationIcon from '../../src/js/components/icons/base/MapLocation';
import MapIcon from '../../src/js/components/icons/base/Map';
import MenuIcon from '../../src/js/components/icons/base/Menu';
import MicrophoneIcon from '../../src/js/components/icons/base/Microphone';
import MoneyIcon from '../../src/js/components/icons/base/Money';
import MonitorIcon from '../../src/js/components/icons/base/Monitor';
import MoreIcon from '../../src/js/components/icons/base/More';
import MultipleIcon from '../../src/js/components/icons/base/Multiple';
import MusicIcon from '../../src/js/components/icons/base/Music';
import NavigateIcon from '../../src/js/components/icons/base/Navigate';
import NewWindowIcon from '../../src/js/components/icons/base/NewWindow';
import NewIcon from '../../src/js/components/icons/base/New';
import NextIcon from '../../src/js/components/icons/base/Next';
import NodesIcon from '../../src/js/components/icons/base/Nodes';
import NoteIcon from '../../src/js/components/icons/base/Note';
import NotesIcon from '../../src/js/components/icons/base/Notes';
import NotificationIcon from '../../src/js/components/icons/base/Notification';
import ObjectGroupIcon from '../../src/js/components/icons/base/ObjectGroup';
import ObjectUngroupIcon from '../../src/js/components/icons/base/ObjectUngroup';
import OptimizeIcon from '../../src/js/components/icons/base/Optimize';
import OrganizationIcon from '../../src/js/components/icons/base/Organization';
import OverviewIcon from '../../src/js/components/icons/base/Overview';
import PaintIcon from '../../src/js/components/icons/base/Paint';
import PanIcon from '../../src/js/components/icons/base/Pan';
import PauseFillIcon from '../../src/js/components/icons/base/PauseFill';
import PauseIcon from '../../src/js/components/icons/base/Pause';
import PersonalComputerIcon from '../../src/js/components/icons/base/PersonalComputer';
import PieChartIcon from '../../src/js/components/icons/base/PieChart';
import PinIcon from '../../src/js/components/icons/base/Pin';
import PlanIcon from '../../src/js/components/icons/base/Plan';
import PlatformAmazonIcon from '../../src/js/components/icons/base/PlatformAmazon';
import PlatformAndroidIcon from '../../src/js/components/icons/base/PlatformAndroid';
import PlatformAppleIcon from '../../src/js/components/icons/base/PlatformApple';
import PlatformArchlinuxIcon from '../../src/js/components/icons/base/PlatformArchlinux';
import PlatformArubaIcon from '../../src/js/components/icons/base/PlatformAruba';
import PlatformCentosIcon from '../../src/js/components/icons/base/PlatformCentos';
import PlatformChromeIcon from '../../src/js/components/icons/base/PlatformChrome';
import PlatformCloudlinuxIcon from '../../src/js/components/icons/base/PlatformCloudlinux';
import PlatformDebianIcon from '../../src/js/components/icons/base/PlatformDebian';
import PlatformDockerIcon from '../../src/js/components/icons/base/PlatformDocker';
import PlatformDosIcon from '../../src/js/components/icons/base/PlatformDos';
import PlatformDropboxIcon from '../../src/js/components/icons/base/PlatformDropbox';
import PlatformEdgeIcon from '../../src/js/components/icons/base/PlatformEdge';
import PlatformFedoraIcon from '../../src/js/components/icons/base/PlatformFedora';
import PlatformFirefoxIcon from '../../src/js/components/icons/base/PlatformFirefox';
import PlatformFreebsdIcon from '../../src/js/components/icons/base/PlatformFreebsd';
import PlatformGoogleIcon from '../../src/js/components/icons/base/PlatformGoogle';
import PlatformHadoopIcon from '../../src/js/components/icons/base/PlatformHadoop';
import PlatformHerokuIcon from '../../src/js/components/icons/base/PlatformHeroku';
import PlatformHortonIcon from '../../src/js/components/icons/base/PlatformHorton';
import PlatformHpIcon from '../../src/js/components/icons/base/PlatformHp';
import PlatformHpiIcon from '../../src/js/components/icons/base/PlatformHpi';
import PlatformInternetExplorerIcon from '../../src/js/components/icons/base/PlatformInternetExplorer';
import PlatformJavaIcon from '../../src/js/components/icons/base/PlatformJava';
import PlatformMandrivaIcon from '../../src/js/components/icons/base/PlatformMandriva';
import PlatformMysqlIcon from '../../src/js/components/icons/base/PlatformMysql';
import PlatformNortonIcon from '../../src/js/components/icons/base/PlatformNorton';
import PlatformOnedriveIcon from '../../src/js/components/icons/base/PlatformOnedrive';
import PlatformOperaIcon from '../../src/js/components/icons/base/PlatformOpera';
import PlatformOracleIcon from '../../src/js/components/icons/base/PlatformOracle';
import PlatformPiedPiperIcon from '../../src/js/components/icons/base/PlatformPiedPiper';
import PlatformRaspberryIcon from '../../src/js/components/icons/base/PlatformRaspberry';
import PlatformReactjsIcon from '../../src/js/components/icons/base/PlatformReactjs';
import PlatformRedhatIcon from '../../src/js/components/icons/base/PlatformRedhat';
import PlatformSafariOptionIcon from '../../src/js/components/icons/base/PlatformSafariOption';
import PlatformSafariIcon from '../../src/js/components/icons/base/PlatformSafari';
import PlatformScoIcon from '../../src/js/components/icons/base/PlatformSco';
import PlatformSolarisIcon from '../../src/js/components/icons/base/PlatformSolaris';
import PlatformSuseIcon from '../../src/js/components/icons/base/PlatformSuse';
import PlatformSwiftIcon from '../../src/js/components/icons/base/PlatformSwift';
import PlatformTurbolinuxIcon from '../../src/js/components/icons/base/PlatformTurbolinux';
import PlatformUbuntuIcon from '../../src/js/components/icons/base/PlatformUbuntu';
import PlatformUnixwareIcon from '../../src/js/components/icons/base/PlatformUnixware';
import PlatformVmwareIcon from '../../src/js/components/icons/base/PlatformVmware';
import PlatformWindowsLegacyIcon from '../../src/js/components/icons/base/PlatformWindowsLegacy';
import PlatformWindowsIcon from '../../src/js/components/icons/base/PlatformWindows';
import PlayFillIcon from '../../src/js/components/icons/base/PlayFill';
import PlayIcon from '../../src/js/components/icons/base/Play';
import PowerIcon from '../../src/js/components/icons/base/Power';
import PreviousIcon from '../../src/js/components/icons/base/Previous';
import PrintIcon from '../../src/js/components/icons/base/Print';
import RadialSelectedIcon from '../../src/js/components/icons/base/RadialSelected';
import RadialIcon from '../../src/js/components/icons/base/Radial';
import RefreshIcon from '../../src/js/components/icons/base/Refresh';
import ResourcesIcon from '../../src/js/components/icons/base/Resources';
import RestaurantIcon from '../../src/js/components/icons/base/Restaurant';
import RestroomMenIcon from '../../src/js/components/icons/base/RestroomMen';
import RestroomWomenIcon from '../../src/js/components/icons/base/RestroomWomen';
import RestroomIcon from '../../src/js/components/icons/base/Restroom';
import ResumeIcon from '../../src/js/components/icons/base/Resume';
import RevertIcon from '../../src/js/components/icons/base/Revert';
import RewindIcon from '../../src/js/components/icons/base/Rewind';
import RiskIcon from '../../src/js/components/icons/base/Risk';
import RobotIcon from '../../src/js/components/icons/base/Robot';
import RssIcon from '../../src/js/components/icons/base/Rss';
import RunIcon from '../../src/js/components/icons/base/Run';
import SatelliteIcon from '../../src/js/components/icons/base/Satellite';
import SaveIcon from '../../src/js/components/icons/base/Save';
import ScanIcon from '../../src/js/components/icons/base/Scan';
import ScheduleNewIcon from '../../src/js/components/icons/base/ScheduleNew';
import SchedulePlayIcon from '../../src/js/components/icons/base/SchedulePlay';
import ScheduleIcon from '../../src/js/components/icons/base/Schedule';
import SchedulesIcon from '../../src/js/components/icons/base/Schedules';
import ScorecardIcon from '../../src/js/components/icons/base/Scorecard';
import SearchAdvancedIcon from '../../src/js/components/icons/base/SearchAdvanced';
import SearchIcon from '../../src/js/components/icons/base/Search';
import SecureIcon from '../../src/js/components/icons/base/Secure';
import SelectIcon from '../../src/js/components/icons/base/Select';
import SelectionIcon from '../../src/js/components/icons/base/Selection';
import SendIcon from '../../src/js/components/icons/base/Send';
import ServerClusterIcon from '../../src/js/components/icons/base/ServerCluster';
import ServerIcon from '../../src/js/components/icons/base/Server';
import ServersIcon from '../../src/js/components/icons/base/Servers';
import ServicePlayIcon from '../../src/js/components/icons/base/ServicePlay';
import ServicesIcon from '../../src/js/components/icons/base/Services';
import SettignsOptionIcon from '../../src/js/components/icons/base/SettignsOption';
import SettingsOptionIcon from '../../src/js/components/icons/base/SettingsOption';
import ShareIcon from '../../src/js/components/icons/base/Share';
import ShieldSecurityIcon from '../../src/js/components/icons/base/ShieldSecurity';
import ShieldIcon from '../../src/js/components/icons/base/Shield';
import ShiftIcon from '../../src/js/components/icons/base/Shift';
import ShopIcon from '../../src/js/components/icons/base/Shop';
import SidebarIcon from '../../src/js/components/icons/base/Sidebar';
import SocialAmazonIcon from '../../src/js/components/icons/base/SocialAmazon';
import SocialAmexIcon from '../../src/js/components/icons/base/SocialAmex';
import SocialBitcoinIcon from '../../src/js/components/icons/base/SocialBitcoin';
import SocialCodepenIcon from '../../src/js/components/icons/base/SocialCodepen';
import SocialCreativeCommonsIcon from '../../src/js/components/icons/base/SocialCreativeCommons';
import SocialDropboxIcon from '../../src/js/components/icons/base/SocialDropbox';
import SocialFacebookOptionIcon from '../../src/js/components/icons/base/SocialFacebookOption';
import SocialFacebookIcon from '../../src/js/components/icons/base/SocialFacebook';
import SocialGithubIcon from '../../src/js/components/icons/base/SocialGithub';
import SocialGooglePlusIcon from '../../src/js/components/icons/base/SocialGooglePlus';
import SocialGoogleWalletIcon from '../../src/js/components/icons/base/SocialGoogleWallet';
import SocialInstagramIcon from '../../src/js/components/icons/base/SocialInstagram';
import SocialLinkedinOptionIcon from '../../src/js/components/icons/base/SocialLinkedinOption';
import SocialLinkedinIcon from '../../src/js/components/icons/base/SocialLinkedin';
import SocialMailIcon from '../../src/js/components/icons/base/SocialMail';
import SocialMastercardIcon from '../../src/js/components/icons/base/SocialMastercard';
import SocialMediumIcon from '../../src/js/components/icons/base/SocialMedium';
import SocialPaypalIcon from '../../src/js/components/icons/base/SocialPaypal';
import SocialPinterestIcon from '../../src/js/components/icons/base/SocialPinterest';
import SocialProductHuntIcon from '../../src/js/components/icons/base/SocialProductHunt';
import SocialRedditIcon from '../../src/js/components/icons/base/SocialReddit';
import SocialSkypeIcon from '../../src/js/components/icons/base/SocialSkype';
import SocialSlackIcon from '../../src/js/components/icons/base/SocialSlack';
import SocialSnapchatIcon from '../../src/js/components/icons/base/SocialSnapchat';
import SocialSquareIcon from '../../src/js/components/icons/base/SocialSquare';
import SocialStackOverflowIcon from '../../src/js/components/icons/base/SocialStackOverflow';
import SocialStripeIcon from '../../src/js/components/icons/base/SocialStripe';
import SocialTumblrIcon from '../../src/js/components/icons/base/SocialTumblr';
import SocialTwitterIcon from '../../src/js/components/icons/base/SocialTwitter';
import SocialVimeoIcon from '../../src/js/components/icons/base/SocialVimeo';
import SocialVineIcon from '../../src/js/components/icons/base/SocialVine';
import SocialVisaIcon from '../../src/js/components/icons/base/SocialVisa';
import SocialWordpressIcon from '../../src/js/components/icons/base/SocialWordpress';
import SocialYoutubeIcon from '../../src/js/components/icons/base/SocialYoutube';
import SortIcon from '../../src/js/components/icons/base/Sort';
import SplitIcon from '../../src/js/components/icons/base/Split';
import SplitsIcon from '../../src/js/components/icons/base/Splits';
import StakeholderIcon from '../../src/js/components/icons/base/Stakeholder';
import Standards3dEffectsIcon from '../../src/js/components/icons/base/Standards-3dEffects';
import StandardsConnectivityIcon from '../../src/js/components/icons/base/StandardsConnectivity';
import StandardsCss3Icon from '../../src/js/components/icons/base/StandardsCss3';
import StandardsDeviceIcon from '../../src/js/components/icons/base/StandardsDevice';
import StandardsFireballIcon from '../../src/js/components/icons/base/StandardsFireball';
import StandardsHtml5Icon from '../../src/js/components/icons/base/StandardsHtml5';
import StandardsMultimediaIcon from '../../src/js/components/icons/base/StandardsMultimedia';
import StandardsOfflineStorageIcon from '../../src/js/components/icons/base/StandardsOfflineStorage';
import StandardsPerformanceIcon from '../../src/js/components/icons/base/StandardsPerformance';
import StandardsSematicsIcon from '../../src/js/components/icons/base/StandardsSematics';
import StarHalfIcon from '../../src/js/components/icons/base/StarHalf';
import StarIcon from '../../src/js/components/icons/base/Star';
import StepsOptionIcon from '../../src/js/components/icons/base/StepsOption';
import StepsIcon from '../../src/js/components/icons/base/Steps';
import StopFillIcon from '../../src/js/components/icons/base/StopFill';
import StopIcon from '../../src/js/components/icons/base/Stop';
import StorageIcon from '../../src/js/components/icons/base/Storage';
import StreetViewIcon from '../../src/js/components/icons/base/StreetView';
import SubtractCircleIcon from '../../src/js/components/icons/base/SubtractCircle';
import SubtractIcon from '../../src/js/components/icons/base/Subtract';
import SupportIcon from '../../src/js/components/icons/base/Support';
import SyncIcon from '../../src/js/components/icons/base/Sync';
import SystemIcon from '../../src/js/components/icons/base/System';
import TableAddIcon from '../../src/js/components/icons/base/TableAdd';
import TableIcon from '../../src/js/components/icons/base/Table';
import TagIcon from '../../src/js/components/icons/base/Tag';
import TargetIcon from '../../src/js/components/icons/base/Target';
import TaskIcon from '../../src/js/components/icons/base/Task';
import TasksIcon from '../../src/js/components/icons/base/Tasks';
import TechnologyIcon from '../../src/js/components/icons/base/Technology';
import TemplateIcon from '../../src/js/components/icons/base/Template';
import TerminalIcon from '../../src/js/components/icons/base/Terminal';
import TestDesktopIcon from '../../src/js/components/icons/base/TestDesktop';
import TestIcon from '../../src/js/components/icons/base/Test';
import TextWrapIcon from '../../src/js/components/icons/base/TextWrap';
import ThreatsIcon from '../../src/js/components/icons/base/Threats';
import TicketIcon from '../../src/js/components/icons/base/Ticket';
import TipIcon from '../../src/js/components/icons/base/Tip';
import ToastIcon from '../../src/js/components/icons/base/Toast';
import ToolsIcon from '../../src/js/components/icons/base/Tools';
import TooltipIcon from '../../src/js/components/icons/base/Tooltip';
import TopCornerIcon from '../../src/js/components/icons/base/TopCorner';
import TransactionIcon from '../../src/js/components/icons/base/Transaction';
import TrashIcon from '../../src/js/components/icons/base/Trash';
import TreeOptionIcon from '../../src/js/components/icons/base/TreeOption';
import TreeIcon from '../../src/js/components/icons/base/Tree';
import TriggerIcon from '../../src/js/components/icons/base/Trigger';
import TrophyIcon from '../../src/js/components/icons/base/Trophy';
import TroubleshootIcon from '../../src/js/components/icons/base/Troubleshoot';
import UnlinkIcon from '../../src/js/components/icons/base/Unlink';
import UnlockIcon from '../../src/js/components/icons/base/Unlock';
import UpIcon from '../../src/js/components/icons/base/Up';
import UpdateIcon from '../../src/js/components/icons/base/Update';
import UpgradeIcon from '../../src/js/components/icons/base/Upgrade';
import UploadIcon from '../../src/js/components/icons/base/Upload';
import UserAddIcon from '../../src/js/components/icons/base/UserAdd';
import UserAdminIcon from '../../src/js/components/icons/base/UserAdmin';
import UserExpertIcon from '../../src/js/components/icons/base/UserExpert';
import UserFemaleIcon from '../../src/js/components/icons/base/UserFemale';
import UserManagerIcon from '../../src/js/components/icons/base/UserManager';
import UserNewIcon from '../../src/js/components/icons/base/UserNew';
import UserPoliceIcon from '../../src/js/components/icons/base/UserPolice';
import UserSettingsIcon from '../../src/js/components/icons/base/UserSettings';
import UserWorkerIcon from '../../src/js/components/icons/base/UserWorker';
import UserIcon from '../../src/js/components/icons/base/User';
import ValidateIcon from '../../src/js/components/icons/base/Validate';
import VideoIcon from '../../src/js/components/icons/base/Video';
import ViewIcon from '../../src/js/components/icons/base/View';
import VirtualMachineIcon from '../../src/js/components/icons/base/VirtualMachine';
import VmMaintenanceIcon from '../../src/js/components/icons/base/VmMaintenance';
import VolumeLowIcon from '../../src/js/components/icons/base/VolumeLow';
import VolumeMuteIcon from '../../src/js/components/icons/base/VolumeMute';
import VolumeIcon from '../../src/js/components/icons/base/Volume';
import VulnerabilityIcon from '../../src/js/components/icons/base/Vulnerability';
import WaypointIcon from '../../src/js/components/icons/base/Waypoint';
import WorkshopIcon from '../../src/js/components/icons/base/Workshop';
import ZoomInIcon from '../../src/js/components/icons/base/ZoomIn';
import ZoomOutIcon from '../../src/js/components/icons/base/ZoomOut';

describe('Icon:', () => {
  it('ThreeDIcon has correct default options', () => {
    const component = renderer.create(
      <ThreeDIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AccessAccessibilityIcon has correct default options', () => {
    const component = renderer.create(
      <AccessAccessibilityIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AccessAdIcon has correct default options', () => {
    const component = renderer.create(
      <AccessAdIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AccessAssistListeningIcon has correct default options', () => {
    const component = renderer.create(
      <AccessAssistListeningIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AccessBrailleIcon has correct default options', () => {
    const component = renderer.create(
      <AccessBrailleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AccessSignIcon has correct default options', () => {
    const component = renderer.create(
      <AccessSignIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AccessTtyIcon has correct default options', () => {
    const component = renderer.create(
      <AccessTtyIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AccessVolumeControlIcon has correct default options', () => {
    const component = renderer.create(
      <AccessVolumeControlIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AccessWheelchairActiveIcon has correct default options', () => {
    const component = renderer.create(
      <AccessWheelchairActiveIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AccessWheelchairIcon has correct default options', () => {
    const component = renderer.create(
      <AccessWheelchairIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AccessibleIcon has correct default options', () => {
    const component = renderer.create(
      <AccessibleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AchievementIcon has correct default options', () => {
    const component = renderer.create(
      <AchievementIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ActionIcon has correct default options', () => {
    const component = renderer.create(
      <ActionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ActionsIcon has correct default options', () => {
    const component = renderer.create(
      <ActionsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AddChapterIcon has correct default options', () => {
    const component = renderer.create(
      <AddChapterIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AddCircleIcon has correct default options', () => {
    const component = renderer.create(
      <AddCircleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AddIcon has correct default options', () => {
    const component = renderer.create(
      <AddIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AedIcon has correct default options', () => {
    const component = renderer.create(
      <AedIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AggregateIcon has correct default options', () => {
    const component = renderer.create(
      <AggregateIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AidOptionIcon has correct default options', () => {
    const component = renderer.create(
      <AidOptionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AidIcon has correct default options', () => {
    const component = renderer.create(
      <AidIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AlarmIcon has correct default options', () => {
    const component = renderer.create(
      <AlarmIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AlertIcon has correct default options', () => {
    const component = renderer.create(
      <AlertIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AnalyticsIcon has correct default options', () => {
    const component = renderer.create(
      <AnalyticsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AnnounceIcon has correct default options', () => {
    const component = renderer.create(
      <AnnounceIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AppsIcon has correct default options', () => {
    const component = renderer.create(
      <AppsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ArchiveIcon has correct default options', () => {
    const component = renderer.create(
      <ArchiveIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ArticleIcon has correct default options', () => {
    const component = renderer.create(
      <ArticleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AscendIcon has correct default options', () => {
    const component = renderer.create(
      <AscendIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AtmIcon has correct default options', () => {
    const component = renderer.create(
      <AtmIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AttachmentIcon has correct default options', () => {
    const component = renderer.create(
      <AttachmentIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AttractionIcon has correct default options', () => {
    const component = renderer.create(
      <AttractionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BabyIcon has correct default options', () => {
    const component = renderer.create(
      <BabyIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BackTenIcon has correct default options', () => {
    const component = renderer.create(
      <BackTenIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BarChartIcon has correct default options', () => {
    const component = renderer.create(
      <BarChartIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BarIcon has correct default options', () => {
    const component = renderer.create(
      <BarIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BasketIcon has correct default options', () => {
    const component = renderer.create(
      <BasketIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BlogIcon has correct default options', () => {
    const component = renderer.create(
      <BlogIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BookIcon has correct default options', () => {
    const component = renderer.create(
      <BookIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BookmarkIcon has correct default options', () => {
    const component = renderer.create(
      <BookmarkIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BottomCornerIcon has correct default options', () => {
    const component = renderer.create(
      <BottomCornerIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BrandAppleAppStoreIcon has correct default options', () => {
    const component = renderer.create(
      <BrandAppleAppStoreIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BrandCodepenEditIcon has correct default options', () => {
    const component = renderer.create(
      <BrandCodepenEditIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BrandCodepenTryIcon has correct default options', () => {
    const component = renderer.create(
      <BrandCodepenTryIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BrandGooglePlayIcon has correct default options', () => {
    const component = renderer.create(
      <BrandGooglePlayIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BrandGrommetOutlineIcon has correct default options', () => {
    const component = renderer.create(
      <BrandGrommetOutlineIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BrandGrommetPathIcon has correct default options', () => {
    const component = renderer.create(
      <BrandGrommetPathIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BrandHpeElementOutlineIcon has correct default options', () => {
    const component = renderer.create(
      <BrandHpeElementOutlineIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BrandHpeElementPathIcon has correct default options', () => {
    const component = renderer.create(
      <BrandHpeElementPathIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BrandHpeLabsInsigniaOutlineIcon has correct default options', () => {
    const component = renderer.create(
      <BrandHpeLabsInsigniaOutlineIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BrandHpeLabsInsigniaIcon has correct default options', () => {
    const component = renderer.create(
      <BrandHpeLabsInsigniaIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BrandHpeStackCenteredIcon has correct default options', () => {
    const component = renderer.create(
      <BrandHpeStackCenteredIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BrandHpeStackIcon has correct default options', () => {
    const component = renderer.create(
      <BrandHpeStackIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BriefcaseIcon has correct default options', () => {
    const component = renderer.create(
      <BriefcaseIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BrushIcon has correct default options', () => {
    const component = renderer.create(
      <BrushIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BugIcon has correct default options', () => {
    const component = renderer.create(
      <BugIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BundleIcon has correct default options', () => {
    const component = renderer.create(
      <BundleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BusIcon has correct default options', () => {
    const component = renderer.create(
      <BusIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('BusinessServiceIcon has correct default options', () => {
    const component = renderer.create(
      <BusinessServiceIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CafeteriaIcon has correct default options', () => {
    const component = renderer.create(
      <CafeteriaIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CalculatorIcon has correct default options', () => {
    const component = renderer.create(
      <CalculatorIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CalendarIcon has correct default options', () => {
    const component = renderer.create(
      <CalendarIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CameraIcon has correct default options', () => {
    const component = renderer.create(
      <CameraIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CapacityIcon has correct default options', () => {
    const component = renderer.create(
      <CapacityIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CarIcon has correct default options', () => {
    const component = renderer.create(
      <CarIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CaretBackIcon has correct default options', () => {
    const component = renderer.create(
      <CaretBackIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CaretDownIcon has correct default options', () => {
    const component = renderer.create(
      <CaretDownIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CaretNextIcon has correct default options', () => {
    const component = renderer.create(
      <CaretNextIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CaretPreviousIcon has correct default options', () => {
    const component = renderer.create(
      <CaretPreviousIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CaretUpIcon has correct default options', () => {
    const component = renderer.create(
      <CaretUpIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CartIcon has correct default options', () => {
    const component = renderer.create(
      <CartIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CatalogOptionIcon has correct default options', () => {
    const component = renderer.create(
      <CatalogOptionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CatalogIcon has correct default options', () => {
    const component = renderer.create(
      <CatalogIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ChannelIcon has correct default options', () => {
    const component = renderer.create(
      <ChannelIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ChapterAddIcon has correct default options', () => {
    const component = renderer.create(
      <ChapterAddIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ChapterNextIcon has correct default options', () => {
    const component = renderer.create(
      <ChapterNextIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ChapterPreviousIcon has correct default options', () => {
    const component = renderer.create(
      <ChapterPreviousIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ChatIcon has correct default options', () => {
    const component = renderer.create(
      <ChatIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CheckboxSelectedIcon has correct default options', () => {
    const component = renderer.create(
      <CheckboxSelectedIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CheckboxIcon has correct default options', () => {
    const component = renderer.create(
      <CheckboxIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CheckmarkIcon has correct default options', () => {
    const component = renderer.create(
      <CheckmarkIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CircleInformationIcon has correct default options', () => {
    const component = renderer.create(
      <CircleInformationIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CirclePlayIcon has correct default options', () => {
    const component = renderer.create(
      <CirclePlayIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CircleQuestionIcon has correct default options', () => {
    const component = renderer.create(
      <CircleQuestionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ClearOptionIcon has correct default options', () => {
    const component = renderer.create(
      <ClearOptionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ClearIcon has correct default options', () => {
    const component = renderer.create(
      <ClearIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CliIcon has correct default options', () => {
    const component = renderer.create(
      <CliIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ClipboardIcon has correct default options', () => {
    const component = renderer.create(
      <ClipboardIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ClockIcon has correct default options', () => {
    const component = renderer.create(
      <ClockIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CloneIcon has correct default options', () => {
    const component = renderer.create(
      <CloneIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CloseIcon has correct default options', () => {
    const component = renderer.create(
      <CloseIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ClosedCaptionIcon has correct default options', () => {
    const component = renderer.create(
      <ClosedCaptionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CloudComputerIcon has correct default options', () => {
    const component = renderer.create(
      <CloudComputerIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CloudDownloadIcon has correct default options', () => {
    const component = renderer.create(
      <CloudDownloadIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CloudSoftwareIcon has correct default options', () => {
    const component = renderer.create(
      <CloudSoftwareIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CloudUploadIcon has correct default options', () => {
    const component = renderer.create(
      <CloudUploadIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CloudIcon has correct default options', () => {
    const component = renderer.create(
      <CloudIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ClusterIcon has correct default options', () => {
    const component = renderer.create(
      <ClusterIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CoatCheckIcon has correct default options', () => {
    const component = renderer.create(
      <CoatCheckIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CodeIcon has correct default options', () => {
    const component = renderer.create(
      <CodeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ColumnsIcon has correct default options', () => {
    const component = renderer.create(
      <ColumnsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CompareIcon has correct default options', () => {
    const component = renderer.create(
      <CompareIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CompassIcon has correct default options', () => {
    const component = renderer.create(
      <CompassIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ComplianceIcon has correct default options', () => {
    const component = renderer.create(
      <ComplianceIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ConfigureIcon has correct default options', () => {
    const component = renderer.create(
      <ConfigureIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ConnectIcon has correct default options', () => {
    const component = renderer.create(
      <ConnectIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ContactInfoIcon has correct default options', () => {
    const component = renderer.create(
      <ContactInfoIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ContactIcon has correct default options', () => {
    const component = renderer.create(
      <ContactIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ContractIcon has correct default options', () => {
    const component = renderer.create(
      <ContractIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CopyIcon has correct default options', () => {
    const component = renderer.create(
      <CopyIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CreditCardIcon has correct default options', () => {
    const component = renderer.create(
      <CreditCardIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CubeIcon has correct default options', () => {
    const component = renderer.create(
      <CubeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CubesIcon has correct default options', () => {
    const component = renderer.create(
      <CubesIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CurrencyIcon has correct default options', () => {
    const component = renderer.create(
      <CurrencyIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CursorIcon has correct default options', () => {
    const component = renderer.create(
      <CursorIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CutIcon has correct default options', () => {
    const component = renderer.create(
      <CutIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CycleIcon has correct default options', () => {
    const component = renderer.create(
      <CycleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DashboardIcon has correct default options', () => {
    const component = renderer.create(
      <DashboardIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DatabaseIcon has correct default options', () => {
    const component = renderer.create(
      <DatabaseIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DeliverIcon has correct default options', () => {
    const component = renderer.create(
      <DeliverIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DeployIcon has correct default options', () => {
    const component = renderer.create(
      <DeployIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DescendIcon has correct default options', () => {
    const component = renderer.create(
      <DescendIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DesktopIcon has correct default options', () => {
    const component = renderer.create(
      <DesktopIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DetachIcon has correct default options', () => {
    const component = renderer.create(
      <DetachIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DiamondIcon has correct default options', () => {
    const component = renderer.create(
      <DiamondIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DirectionsIcon has correct default options', () => {
    const component = renderer.create(
      <DirectionsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DislikeIcon has correct default options', () => {
    const component = renderer.create(
      <DislikeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentCloudIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentCloudIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentConfigIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentConfigIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentCsvIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentCsvIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentDownloadIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentDownloadIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentExcelIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentExcelIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentExeIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentExeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentImageIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentImageIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentLockedIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentLockedIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentMissingIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentMissingIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentNotesIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentNotesIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentOutlookIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentOutlookIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentPdfIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentPdfIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentPerformanceIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentPerformanceIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentPptIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentPptIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentRtfIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentRtfIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentSoundIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentSoundIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentStoreIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentStoreIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentTestIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentTestIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentTextIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentTextIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentThreatIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentThreatIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentTimeIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentTimeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentTransferIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentTransferIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentTxtIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentTxtIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentUpdateIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentUpdateIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentUploadIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentUploadIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentUserIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentUserIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentVerifiedIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentVerifiedIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentVideoIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentVideoIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentWindowsIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentWindowsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentWordIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentWordIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentZipIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentZipIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DocumentIcon has correct default options', () => {
    const component = renderer.create(
      <DocumentIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DomainIcon has correct default options', () => {
    const component = renderer.create(
      <DomainIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DownIcon has correct default options', () => {
    const component = renderer.create(
      <DownIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DownloadIcon has correct default options', () => {
    const component = renderer.create(
      <DownloadIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DragIcon has correct default options', () => {
    const component = renderer.create(
      <DragIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DriveCageIcon has correct default options', () => {
    const component = renderer.create(
      <DriveCageIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('DuplicateIcon has correct default options', () => {
    const component = renderer.create(
      <DuplicateIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('EditIcon has correct default options', () => {
    const component = renderer.create(
      <EditIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('EjectIcon has correct default options', () => {
    const component = renderer.create(
      <EjectIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ElevatorIcon has correct default options', () => {
    const component = renderer.create(
      <ElevatorIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('EmergencyIcon has correct default options', () => {
    const component = renderer.create(
      <EmergencyIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('EmptyCircleIcon has correct default options', () => {
    const component = renderer.create(
      <EmptyCircleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('EscalatorIcon has correct default options', () => {
    const component = renderer.create(
      <EscalatorIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ExpandIcon has correct default options', () => {
    const component = renderer.create(
      <ExpandIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FanIcon has correct default options', () => {
    const component = renderer.create(
      <FanIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FastForwardIcon has correct default options', () => {
    const component = renderer.create(
      <FastForwardIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FavoriteIcon has correct default options', () => {
    const component = renderer.create(
      <FavoriteIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FilterIcon has correct default options', () => {
    const component = renderer.create(
      <FilterIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FingerPrintIcon has correct default options', () => {
    const component = renderer.create(
      <FingerPrintIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FlagIcon has correct default options', () => {
    const component = renderer.create(
      <FlagIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FolderCycleIcon has correct default options', () => {
    const component = renderer.create(
      <FolderCycleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FolderOpenIcon has correct default options', () => {
    const component = renderer.create(
      <FolderOpenIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FolderIcon has correct default options', () => {
    const component = renderer.create(
      <FolderIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormAddIcon has correct default options', () => {
    const component = renderer.create(
      <FormAddIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormAttachmentIcon has correct default options', () => {
    const component = renderer.create(
      <FormAttachmentIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormCalendarIcon has correct default options', () => {
    const component = renderer.create(
      <FormCalendarIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormCheckmarkIcon has correct default options', () => {
    const component = renderer.create(
      <FormCheckmarkIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormClockIcon has correct default options', () => {
    const component = renderer.create(
      <FormClockIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormCloseIcon has correct default options', () => {
    const component = renderer.create(
      <FormCloseIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormCutIcon has correct default options', () => {
    const component = renderer.create(
      <FormCutIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormDownIcon has correct default options', () => {
    const component = renderer.create(
      <FormDownIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormEditIcon has correct default options', () => {
    const component = renderer.create(
      <FormEditIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormFilterIcon has correct default options', () => {
    const component = renderer.create(
      <FormFilterIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormFolderIcon has correct default options', () => {
    const component = renderer.create(
      <FormFolderIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormLocationIcon has correct default options', () => {
    const component = renderer.create(
      <FormLocationIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormLockIcon has correct default options', () => {
    const component = renderer.create(
      <FormLockIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormNextLinkIcon has correct default options', () => {
    const component = renderer.create(
      <FormNextLinkIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormNextIcon has correct default options', () => {
    const component = renderer.create(
      <FormNextIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormPreviousLinkIcon has correct default options', () => {
    const component = renderer.create(
      <FormPreviousLinkIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormPreviousIcon has correct default options', () => {
    const component = renderer.create(
      <FormPreviousIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormRefreshIcon has correct default options', () => {
    const component = renderer.create(
      <FormRefreshIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormScheduleIcon has correct default options', () => {
    const component = renderer.create(
      <FormScheduleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormSearchIcon has correct default options', () => {
    const component = renderer.create(
      <FormSearchIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormSubtractIcon has correct default options', () => {
    const component = renderer.create(
      <FormSubtractIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormTrashIcon has correct default options', () => {
    const component = renderer.create(
      <FormTrashIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormUpIcon has correct default options', () => {
    const component = renderer.create(
      <FormUpIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('FormUploadIcon has correct default options', () => {
    const component = renderer.create(
      <FormUploadIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ForwardTenIcon has correct default options', () => {
    const component = renderer.create(
      <ForwardTenIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('GalleryIcon has correct default options', () => {
    const component = renderer.create(
      <GalleryIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('GamepadIcon has correct default options', () => {
    const component = renderer.create(
      <GamepadIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('GiftIcon has correct default options', () => {
    const component = renderer.create(
      <GiftIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('GlobeIcon has correct default options', () => {
    const component = renderer.create(
      <GlobeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('GridIcon has correct default options', () => {
    const component = renderer.create(
      <GridIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('GroupIcon has correct default options', () => {
    const component = renderer.create(
      <GroupIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('GrowIcon has correct default options', () => {
    const component = renderer.create(
      <GrowIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('HaltIcon has correct default options', () => {
    const component = renderer.create(
      <HaltIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('HelpIcon has correct default options', () => {
    const component = renderer.create(
      <HelpIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('HistoryIcon has correct default options', () => {
    const component = renderer.create(
      <HistoryIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('HomeIcon has correct default options', () => {
    const component = renderer.create(
      <HomeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('HostMaintenanceIcon has correct default options', () => {
    const component = renderer.create(
      <HostMaintenanceIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('HostIcon has correct default options', () => {
    const component = renderer.create(
      <HostIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('IceCreamIcon has correct default options', () => {
    const component = renderer.create(
      <IceCreamIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ImageIcon has correct default options', () => {
    const component = renderer.create(
      <ImageIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ImpactIcon has correct default options', () => {
    const component = renderer.create(
      <ImpactIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('InProgressIcon has correct default options', () => {
    const component = renderer.create(
      <InProgressIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('InboxIcon has correct default options', () => {
    const component = renderer.create(
      <InboxIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('IndicatorIcon has correct default options', () => {
    const component = renderer.create(
      <IndicatorIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('InfoIcon has correct default options', () => {
    const component = renderer.create(
      <InfoIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('InheritIcon has correct default options', () => {
    const component = renderer.create(
      <InheritIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('InspectIcon has correct default options', () => {
    const component = renderer.create(
      <InspectIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('InstallOptionIcon has correct default options', () => {
    const component = renderer.create(
      <InstallOptionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('InstallIcon has correct default options', () => {
    const component = renderer.create(
      <InstallIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('IntegrationIcon has correct default options', () => {
    const component = renderer.create(
      <IntegrationIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('IterationIcon has correct default options', () => {
    const component = renderer.create(
      <IterationIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('JavaIcon has correct default options', () => {
    const component = renderer.create(
      <JavaIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LanguageIcon has correct default options', () => {
    const component = renderer.create(
      <LanguageIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LaunchIcon has correct default options', () => {
    const component = renderer.create(
      <LaunchIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LayerIcon has correct default options', () => {
    const component = renderer.create(
      <LayerIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LicenseIcon has correct default options', () => {
    const component = renderer.create(
      <LicenseIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LikeIcon has correct default options', () => {
    const component = renderer.create(
      <LikeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LineChartIcon has correct default options', () => {
    const component = renderer.create(
      <LineChartIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LinkBottomIcon has correct default options', () => {
    const component = renderer.create(
      <LinkBottomIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LinkDownIcon has correct default options', () => {
    const component = renderer.create(
      <LinkDownIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LinkNextIcon has correct default options', () => {
    const component = renderer.create(
      <LinkNextIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LinkPreviousIcon has correct default options', () => {
    const component = renderer.create(
      <LinkPreviousIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LinkTopIcon has correct default options', () => {
    const component = renderer.create(
      <LinkTopIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LinkUpIcon has correct default options', () => {
    const component = renderer.create(
      <LinkUpIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LinkIcon has correct default options', () => {
    const component = renderer.create(
      <LinkIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LocalIcon has correct default options', () => {
    const component = renderer.create(
      <LocalIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LocationPinIcon has correct default options', () => {
    const component = renderer.create(
      <LocationPinIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LocationIcon has correct default options', () => {
    const component = renderer.create(
      <LocationIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LockIcon has correct default options', () => {
    const component = renderer.create(
      <LockIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LoginIcon has correct default options', () => {
    const component = renderer.create(
      <LoginIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LogoutIcon has correct default options', () => {
    const component = renderer.create(
      <LogoutIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('LoungeIcon has correct default options', () => {
    const component = renderer.create(
      <LoungeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('MagicIcon has correct default options', () => {
    const component = renderer.create(
      <MagicIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('MailOptionIcon has correct default options', () => {
    const component = renderer.create(
      <MailOptionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('MailIcon has correct default options', () => {
    const component = renderer.create(
      <MailIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ManualIcon has correct default options', () => {
    const component = renderer.create(
      <ManualIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('MapLocationIcon has correct default options', () => {
    const component = renderer.create(
      <MapLocationIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('MapIcon has correct default options', () => {
    const component = renderer.create(
      <MapIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('MenuIcon has correct default options', () => {
    const component = renderer.create(
      <MenuIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('MicrophoneIcon has correct default options', () => {
    const component = renderer.create(
      <MicrophoneIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('MoneyIcon has correct default options', () => {
    const component = renderer.create(
      <MoneyIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('MonitorIcon has correct default options', () => {
    const component = renderer.create(
      <MonitorIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('MoreIcon has correct default options', () => {
    const component = renderer.create(
      <MoreIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('MultipleIcon has correct default options', () => {
    const component = renderer.create(
      <MultipleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('MusicIcon has correct default options', () => {
    const component = renderer.create(
      <MusicIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('NavigateIcon has correct default options', () => {
    const component = renderer.create(
      <NavigateIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('NewWindowIcon has correct default options', () => {
    const component = renderer.create(
      <NewWindowIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('NewIcon has correct default options', () => {
    const component = renderer.create(
      <NewIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('NextIcon has correct default options', () => {
    const component = renderer.create(
      <NextIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('NodesIcon has correct default options', () => {
    const component = renderer.create(
      <NodesIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('NoteIcon has correct default options', () => {
    const component = renderer.create(
      <NoteIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('NotesIcon has correct default options', () => {
    const component = renderer.create(
      <NotesIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('NotificationIcon has correct default options', () => {
    const component = renderer.create(
      <NotificationIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ObjectGroupIcon has correct default options', () => {
    const component = renderer.create(
      <ObjectGroupIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ObjectUngroupIcon has correct default options', () => {
    const component = renderer.create(
      <ObjectUngroupIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('OptimizeIcon has correct default options', () => {
    const component = renderer.create(
      <OptimizeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('OrganizationIcon has correct default options', () => {
    const component = renderer.create(
      <OrganizationIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('OverviewIcon has correct default options', () => {
    const component = renderer.create(
      <OverviewIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PaintIcon has correct default options', () => {
    const component = renderer.create(
      <PaintIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PanIcon has correct default options', () => {
    const component = renderer.create(
      <PanIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PauseFillIcon has correct default options', () => {
    const component = renderer.create(
      <PauseFillIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PauseIcon has correct default options', () => {
    const component = renderer.create(
      <PauseIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PersonalComputerIcon has correct default options', () => {
    const component = renderer.create(
      <PersonalComputerIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PieChartIcon has correct default options', () => {
    const component = renderer.create(
      <PieChartIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PinIcon has correct default options', () => {
    const component = renderer.create(
      <PinIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlanIcon has correct default options', () => {
    const component = renderer.create(
      <PlanIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformAmazonIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformAmazonIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformAndroidIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformAndroidIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformAppleIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformAppleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformArchlinuxIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformArchlinuxIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformArubaIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformArubaIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformCentosIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformCentosIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformChromeIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformChromeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformCloudlinuxIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformCloudlinuxIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformDebianIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformDebianIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformDockerIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformDockerIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformDosIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformDosIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformDropboxIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformDropboxIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformEdgeIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformEdgeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformFedoraIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformFedoraIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformFirefoxIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformFirefoxIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformFreebsdIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformFreebsdIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformGoogleIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformGoogleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformHadoopIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformHadoopIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformHerokuIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformHerokuIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformHortonIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformHortonIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformHpIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformHpIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformHpiIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformHpiIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformInternetExplorerIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformInternetExplorerIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformJavaIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformJavaIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformMandrivaIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformMandrivaIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformMysqlIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformMysqlIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformNortonIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformNortonIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformOnedriveIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformOnedriveIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformOperaIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformOperaIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformOracleIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformOracleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformPiedPiperIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformPiedPiperIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformRaspberryIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformRaspberryIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformReactjsIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformReactjsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformRedhatIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformRedhatIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformSafariOptionIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformSafariOptionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformSafariIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformSafariIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformScoIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformScoIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformSolarisIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformSolarisIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformSuseIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformSuseIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformSwiftIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformSwiftIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformTurbolinuxIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformTurbolinuxIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformUbuntuIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformUbuntuIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformUnixwareIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformUnixwareIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformVmwareIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformVmwareIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformWindowsLegacyIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformWindowsLegacyIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlatformWindowsIcon has correct default options', () => {
    const component = renderer.create(
      <PlatformWindowsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlayFillIcon has correct default options', () => {
    const component = renderer.create(
      <PlayFillIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PlayIcon has correct default options', () => {
    const component = renderer.create(
      <PlayIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PowerIcon has correct default options', () => {
    const component = renderer.create(
      <PowerIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PreviousIcon has correct default options', () => {
    const component = renderer.create(
      <PreviousIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('PrintIcon has correct default options', () => {
    const component = renderer.create(
      <PrintIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('RadialSelectedIcon has correct default options', () => {
    const component = renderer.create(
      <RadialSelectedIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('RadialIcon has correct default options', () => {
    const component = renderer.create(
      <RadialIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('RefreshIcon has correct default options', () => {
    const component = renderer.create(
      <RefreshIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ResourcesIcon has correct default options', () => {
    const component = renderer.create(
      <ResourcesIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('RestaurantIcon has correct default options', () => {
    const component = renderer.create(
      <RestaurantIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('RestroomMenIcon has correct default options', () => {
    const component = renderer.create(
      <RestroomMenIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('RestroomWomenIcon has correct default options', () => {
    const component = renderer.create(
      <RestroomWomenIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('RestroomIcon has correct default options', () => {
    const component = renderer.create(
      <RestroomIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ResumeIcon has correct default options', () => {
    const component = renderer.create(
      <ResumeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('RevertIcon has correct default options', () => {
    const component = renderer.create(
      <RevertIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('RewindIcon has correct default options', () => {
    const component = renderer.create(
      <RewindIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('RiskIcon has correct default options', () => {
    const component = renderer.create(
      <RiskIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('RobotIcon has correct default options', () => {
    const component = renderer.create(
      <RobotIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('RssIcon has correct default options', () => {
    const component = renderer.create(
      <RssIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('RunIcon has correct default options', () => {
    const component = renderer.create(
      <RunIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SatelliteIcon has correct default options', () => {
    const component = renderer.create(
      <SatelliteIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SaveIcon has correct default options', () => {
    const component = renderer.create(
      <SaveIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ScanIcon has correct default options', () => {
    const component = renderer.create(
      <ScanIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ScheduleNewIcon has correct default options', () => {
    const component = renderer.create(
      <ScheduleNewIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SchedulePlayIcon has correct default options', () => {
    const component = renderer.create(
      <SchedulePlayIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ScheduleIcon has correct default options', () => {
    const component = renderer.create(
      <ScheduleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SchedulesIcon has correct default options', () => {
    const component = renderer.create(
      <SchedulesIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ScorecardIcon has correct default options', () => {
    const component = renderer.create(
      <ScorecardIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SearchAdvancedIcon has correct default options', () => {
    const component = renderer.create(
      <SearchAdvancedIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SearchIcon has correct default options', () => {
    const component = renderer.create(
      <SearchIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SecureIcon has correct default options', () => {
    const component = renderer.create(
      <SecureIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SelectIcon has correct default options', () => {
    const component = renderer.create(
      <SelectIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SelectionIcon has correct default options', () => {
    const component = renderer.create(
      <SelectionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SendIcon has correct default options', () => {
    const component = renderer.create(
      <SendIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ServerClusterIcon has correct default options', () => {
    const component = renderer.create(
      <ServerClusterIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ServerIcon has correct default options', () => {
    const component = renderer.create(
      <ServerIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ServersIcon has correct default options', () => {
    const component = renderer.create(
      <ServersIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ServicePlayIcon has correct default options', () => {
    const component = renderer.create(
      <ServicePlayIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ServicesIcon has correct default options', () => {
    const component = renderer.create(
      <ServicesIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SettignsOptionIcon has correct default options', () => {
    const component = renderer.create(
      <SettignsOptionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SettingsOptionIcon has correct default options', () => {
    const component = renderer.create(
      <SettingsOptionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ShareIcon has correct default options', () => {
    const component = renderer.create(
      <ShareIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ShieldSecurityIcon has correct default options', () => {
    const component = renderer.create(
      <ShieldSecurityIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ShieldIcon has correct default options', () => {
    const component = renderer.create(
      <ShieldIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ShiftIcon has correct default options', () => {
    const component = renderer.create(
      <ShiftIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ShopIcon has correct default options', () => {
    const component = renderer.create(
      <ShopIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SidebarIcon has correct default options', () => {
    const component = renderer.create(
      <SidebarIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialAmazonIcon has correct default options', () => {
    const component = renderer.create(
      <SocialAmazonIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialAmexIcon has correct default options', () => {
    const component = renderer.create(
      <SocialAmexIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialBitcoinIcon has correct default options', () => {
    const component = renderer.create(
      <SocialBitcoinIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialCodepenIcon has correct default options', () => {
    const component = renderer.create(
      <SocialCodepenIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialCreativeCommonsIcon has correct default options', () => {
    const component = renderer.create(
      <SocialCreativeCommonsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialDropboxIcon has correct default options', () => {
    const component = renderer.create(
      <SocialDropboxIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialFacebookOptionIcon has correct default options', () => {
    const component = renderer.create(
      <SocialFacebookOptionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialFacebookIcon has correct default options', () => {
    const component = renderer.create(
      <SocialFacebookIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialGithubIcon has correct default options', () => {
    const component = renderer.create(
      <SocialGithubIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialGooglePlusIcon has correct default options', () => {
    const component = renderer.create(
      <SocialGooglePlusIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialGoogleWalletIcon has correct default options', () => {
    const component = renderer.create(
      <SocialGoogleWalletIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialInstagramIcon has correct default options', () => {
    const component = renderer.create(
      <SocialInstagramIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialLinkedinOptionIcon has correct default options', () => {
    const component = renderer.create(
      <SocialLinkedinOptionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialLinkedinIcon has correct default options', () => {
    const component = renderer.create(
      <SocialLinkedinIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialMailIcon has correct default options', () => {
    const component = renderer.create(
      <SocialMailIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialMastercardIcon has correct default options', () => {
    const component = renderer.create(
      <SocialMastercardIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialMediumIcon has correct default options', () => {
    const component = renderer.create(
      <SocialMediumIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialPaypalIcon has correct default options', () => {
    const component = renderer.create(
      <SocialPaypalIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialPinterestIcon has correct default options', () => {
    const component = renderer.create(
      <SocialPinterestIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialProductHuntIcon has correct default options', () => {
    const component = renderer.create(
      <SocialProductHuntIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialRedditIcon has correct default options', () => {
    const component = renderer.create(
      <SocialRedditIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialSkypeIcon has correct default options', () => {
    const component = renderer.create(
      <SocialSkypeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialSlackIcon has correct default options', () => {
    const component = renderer.create(
      <SocialSlackIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialSnapchatIcon has correct default options', () => {
    const component = renderer.create(
      <SocialSnapchatIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialSquareIcon has correct default options', () => {
    const component = renderer.create(
      <SocialSquareIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialStackOverflowIcon has correct default options', () => {
    const component = renderer.create(
      <SocialStackOverflowIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialStripeIcon has correct default options', () => {
    const component = renderer.create(
      <SocialStripeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialTumblrIcon has correct default options', () => {
    const component = renderer.create(
      <SocialTumblrIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialTwitterIcon has correct default options', () => {
    const component = renderer.create(
      <SocialTwitterIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialVimeoIcon has correct default options', () => {
    const component = renderer.create(
      <SocialVimeoIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialVineIcon has correct default options', () => {
    const component = renderer.create(
      <SocialVineIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialVisaIcon has correct default options', () => {
    const component = renderer.create(
      <SocialVisaIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialWordpressIcon has correct default options', () => {
    const component = renderer.create(
      <SocialWordpressIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SocialYoutubeIcon has correct default options', () => {
    const component = renderer.create(
      <SocialYoutubeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SortIcon has correct default options', () => {
    const component = renderer.create(
      <SortIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SplitIcon has correct default options', () => {
    const component = renderer.create(
      <SplitIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SplitsIcon has correct default options', () => {
    const component = renderer.create(
      <SplitsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StakeholderIcon has correct default options', () => {
    const component = renderer.create(
      <StakeholderIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Standards3dEffectsIcon has correct default options', () => {
    const component = renderer.create(
      <Standards3dEffectsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StandardsConnectivityIcon has correct default options', () => {
    const component = renderer.create(
      <StandardsConnectivityIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StandardsCss3Icon has correct default options', () => {
    const component = renderer.create(
      <StandardsCss3Icon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StandardsDeviceIcon has correct default options', () => {
    const component = renderer.create(
      <StandardsDeviceIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StandardsFireballIcon has correct default options', () => {
    const component = renderer.create(
      <StandardsFireballIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StandardsHtml5Icon has correct default options', () => {
    const component = renderer.create(
      <StandardsHtml5Icon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StandardsMultimediaIcon has correct default options', () => {
    const component = renderer.create(
      <StandardsMultimediaIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StandardsOfflineStorageIcon has correct default options', () => {
    const component = renderer.create(
      <StandardsOfflineStorageIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StandardsPerformanceIcon has correct default options', () => {
    const component = renderer.create(
      <StandardsPerformanceIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StandardsSematicsIcon has correct default options', () => {
    const component = renderer.create(
      <StandardsSematicsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StarHalfIcon has correct default options', () => {
    const component = renderer.create(
      <StarHalfIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StarIcon has correct default options', () => {
    const component = renderer.create(
      <StarIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StepsOptionIcon has correct default options', () => {
    const component = renderer.create(
      <StepsOptionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StepsIcon has correct default options', () => {
    const component = renderer.create(
      <StepsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StopFillIcon has correct default options', () => {
    const component = renderer.create(
      <StopFillIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StopIcon has correct default options', () => {
    const component = renderer.create(
      <StopIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StorageIcon has correct default options', () => {
    const component = renderer.create(
      <StorageIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('StreetViewIcon has correct default options', () => {
    const component = renderer.create(
      <StreetViewIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SubtractCircleIcon has correct default options', () => {
    const component = renderer.create(
      <SubtractCircleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SubtractIcon has correct default options', () => {
    const component = renderer.create(
      <SubtractIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SupportIcon has correct default options', () => {
    const component = renderer.create(
      <SupportIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SyncIcon has correct default options', () => {
    const component = renderer.create(
      <SyncIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('SystemIcon has correct default options', () => {
    const component = renderer.create(
      <SystemIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TableAddIcon has correct default options', () => {
    const component = renderer.create(
      <TableAddIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TableIcon has correct default options', () => {
    const component = renderer.create(
      <TableIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TagIcon has correct default options', () => {
    const component = renderer.create(
      <TagIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TargetIcon has correct default options', () => {
    const component = renderer.create(
      <TargetIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TaskIcon has correct default options', () => {
    const component = renderer.create(
      <TaskIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TasksIcon has correct default options', () => {
    const component = renderer.create(
      <TasksIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TechnologyIcon has correct default options', () => {
    const component = renderer.create(
      <TechnologyIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TemplateIcon has correct default options', () => {
    const component = renderer.create(
      <TemplateIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TerminalIcon has correct default options', () => {
    const component = renderer.create(
      <TerminalIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TestDesktopIcon has correct default options', () => {
    const component = renderer.create(
      <TestDesktopIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TestIcon has correct default options', () => {
    const component = renderer.create(
      <TestIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TextWrapIcon has correct default options', () => {
    const component = renderer.create(
      <TextWrapIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ThreatsIcon has correct default options', () => {
    const component = renderer.create(
      <ThreatsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TicketIcon has correct default options', () => {
    const component = renderer.create(
      <TicketIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TipIcon has correct default options', () => {
    const component = renderer.create(
      <TipIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ToastIcon has correct default options', () => {
    const component = renderer.create(
      <ToastIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ToolsIcon has correct default options', () => {
    const component = renderer.create(
      <ToolsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TooltipIcon has correct default options', () => {
    const component = renderer.create(
      <TooltipIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TopCornerIcon has correct default options', () => {
    const component = renderer.create(
      <TopCornerIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TransactionIcon has correct default options', () => {
    const component = renderer.create(
      <TransactionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TrashIcon has correct default options', () => {
    const component = renderer.create(
      <TrashIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TreeOptionIcon has correct default options', () => {
    const component = renderer.create(
      <TreeOptionIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TreeIcon has correct default options', () => {
    const component = renderer.create(
      <TreeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TriggerIcon has correct default options', () => {
    const component = renderer.create(
      <TriggerIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TrophyIcon has correct default options', () => {
    const component = renderer.create(
      <TrophyIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('TroubleshootIcon has correct default options', () => {
    const component = renderer.create(
      <TroubleshootIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UnlinkIcon has correct default options', () => {
    const component = renderer.create(
      <UnlinkIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UnlockIcon has correct default options', () => {
    const component = renderer.create(
      <UnlockIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UpIcon has correct default options', () => {
    const component = renderer.create(
      <UpIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UpdateIcon has correct default options', () => {
    const component = renderer.create(
      <UpdateIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UpgradeIcon has correct default options', () => {
    const component = renderer.create(
      <UpgradeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UploadIcon has correct default options', () => {
    const component = renderer.create(
      <UploadIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UserAddIcon has correct default options', () => {
    const component = renderer.create(
      <UserAddIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UserAdminIcon has correct default options', () => {
    const component = renderer.create(
      <UserAdminIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UserExpertIcon has correct default options', () => {
    const component = renderer.create(
      <UserExpertIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UserFemaleIcon has correct default options', () => {
    const component = renderer.create(
      <UserFemaleIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UserManagerIcon has correct default options', () => {
    const component = renderer.create(
      <UserManagerIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UserNewIcon has correct default options', () => {
    const component = renderer.create(
      <UserNewIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UserPoliceIcon has correct default options', () => {
    const component = renderer.create(
      <UserPoliceIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UserSettingsIcon has correct default options', () => {
    const component = renderer.create(
      <UserSettingsIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UserWorkerIcon has correct default options', () => {
    const component = renderer.create(
      <UserWorkerIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('UserIcon has correct default options', () => {
    const component = renderer.create(
      <UserIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ValidateIcon has correct default options', () => {
    const component = renderer.create(
      <ValidateIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('VideoIcon has correct default options', () => {
    const component = renderer.create(
      <VideoIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ViewIcon has correct default options', () => {
    const component = renderer.create(
      <ViewIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('VirtualMachineIcon has correct default options', () => {
    const component = renderer.create(
      <VirtualMachineIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('VmMaintenanceIcon has correct default options', () => {
    const component = renderer.create(
      <VmMaintenanceIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('VolumeLowIcon has correct default options', () => {
    const component = renderer.create(
      <VolumeLowIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('VolumeMuteIcon has correct default options', () => {
    const component = renderer.create(
      <VolumeMuteIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('VolumeIcon has correct default options', () => {
    const component = renderer.create(
      <VolumeIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('VulnerabilityIcon has correct default options', () => {
    const component = renderer.create(
      <VulnerabilityIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('WaypointIcon has correct default options', () => {
    const component = renderer.create(
      <WaypointIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('WorkshopIcon has correct default options', () => {
    const component = renderer.create(
      <WorkshopIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ZoomInIcon has correct default options', () => {
    const component = renderer.create(
      <ZoomInIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ZoomOutIcon has correct default options', () => {
    const component = renderer.create(
      <ZoomOutIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
