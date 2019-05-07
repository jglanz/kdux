import com.android.build.gradle.BaseExtension
import com.android.build.gradle.tasks.BundleAar
import org.gradle.api.Project
import org.gradle.api.artifacts.dsl.RepositoryHandler
import org.gradle.api.initialization.Settings
import org.gradle.kotlin.dsl.extra
import org.gradle.kotlin.dsl.getByName
import org.gradle.kotlin.dsl.project
import java.io.File
import java.util.*


fun addRepositories(repositoryHandler:RepositoryHandler) = with(repositoryHandler) {
  mavenLocal()
  google()
  gradlePluginPortal()
  jcenter()
  mavenCentral()
  maven { url = java.net.URI("https://jitpack.io") }
  maven {
    url = java.net.URI("https://dl.bintray.com/kotlin/kotlin-eap")
  }
}

//repositories {
//  google()
//  jcenter()
//  mavenCentral()
//  maven {
//    url = URI("https://dl.bintray.com/kotlin/kotlin-eap")
//  }
//  maven { url = URI("https://jitpack.io") }
//  mavenLocal()
//}

private val propertyFileMap = mutableMapOf<File,Properties>()

/**
 * Get properties and cache them for access on all downstream
 * objects, specificaly Project & Settings
 * @param dir File
 * @return Properties
 */
private fun getProperties(dir:File):Properties = synchronized(propertyFileMap) {
  propertyFileMap.getOrPut(dir) {
    Properties().apply {
      arrayOf("gradle","local")
        .forEach { name ->
          val filename = "${name}.properties"
          File(dir,filename)
            .inputStream()
            .use {
              load(it)
            }
        }
    }
  }
}




fun Settings.property(key: String) =
  getProperties(settingsDir)[key] as String?

fun Settings.hasProperty(key: String) =
  getProperties(settingsDir).contains(key)

operator fun Settings.get(key: String) = if (hasProperty(key)) property(key) else null

val Project.kduxVersions
  get() = File(rootProject.projectDir,"version.txt").readText().split("\n").let { Pair(it[0], it[1].toInt()) }

val Project.kduxVersion
  get() = kduxVersions.first

val Project.kduxVersionCode
  get() = kduxVersions.second

val Project.kduxCoreProject
  get() = dependencies.project(":kdux-core")

val Project.kduxAndroidProject
  get() = dependencies.project(":kdux-android")

val Project.kduxAndroidFlipperPluginProject
  get() = dependencies.project(":kdux-android-flipper-plugin")

val Project.androidLibraryReleaseAar
  get() = tasks.getByName<BundleAar>("bundleReleaseAar").archiveFile

@Suppress("UNCHECKED_CAST")
val Project.uploadPublications:MutableList<String>
  get() =
    when {
      extra.has("uploadPublications") -> project.extra["uploadPublications"] as MutableList<String>
      else -> {
        val newPubs = mutableListOf<String>()
        project.extra.set("uploadPublications", newPubs)
        newPubs
      }
    }

val Project.isAndroidLibrary
  get() = extensions.findByType(BaseExtension::class.java)  != null

val Project.assembleTaskName
  get() = when {
    isAndroidLibrary -> "assembleRelease"
    else -> "assemble"
  }


val Project.bundleTaskName
  get() = when {
    isAndroidLibrary -> "bundleReleaseAar"
    else -> "bundleRelease"
  }

val Project.assembleTask
  get() = tasks.findByName(assembleTaskName) ?: tasks.findByName(bundleTaskName)

val Project.defaultPublicationName
  get() = "${project.name}-publication"


val Project.binTrayKey
  get() = System.getenv("BINTRAY_API_KEY") ?: ""

val Project.publishedProjects:List<String>
  get() = listOf(":kdux-core",":kdux-android",":kdux-android-flipper-plugin")